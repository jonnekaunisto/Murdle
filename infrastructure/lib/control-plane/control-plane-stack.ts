import { Stack } from "aws-cdk-lib";
import { ApiDefinition, CfnRestApi, DomainName, SecurityPolicy, SpecRestApi } from 'aws-cdk-lib/aws-apigateway';
import { ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { CfnFunction } from "aws-cdk-lib/aws-lambda";
import { CfnAlias } from "aws-cdk-lib/aws-kms";
import { Table } from "aws-cdk-lib/aws-dynamodb";
import { ARecord, HostedZone, RecordTarget } from "aws-cdk-lib/aws-route53";
import { ApiGatewayDomain } from "aws-cdk-lib/aws-route53-targets";
import { Construct } from 'constructs';
import { readFileSync } from "fs";
import { CertificateValidation, DnsValidatedCertificate } from "aws-cdk-lib/aws-certificatemanager";

export interface ControlPlaneAPIStackProps {
  usersTable: Table,
  hostedZone: HostedZone,
}

export class ControlPlaneStack extends Stack {
  public readonly api: SpecRestApi;

  constructor(scope: Construct, id: string, props: ControlPlaneAPIStackProps) {
    super(scope, id);

    const apiFunction = new NodejsFunction(this, 'ControlPlaneAPILambda', {
      entry: '../ControlPlaneService/lib/index.ts',
      handler: 'handler',
      functionName: 'MurdleControlPlaneLambda',
      memorySize: 512,
    });
    (apiFunction.node.defaultChild as CfnFunction).overrideLogicalId('ControlPlaneLambda');

    props.usersTable.grantReadWriteData(apiFunction);

    const alias = apiFunction.latestVersion.addAlias('live');
    (alias.node.defaultChild as CfnAlias).overrideLogicalId('ControlPlaneLambdaAlias');

    const def: JSON = getOpenApiFile();
    this.api = new SpecRestApi(this, 'MurdleControlPlaneAPI', {
      apiDefinition: ApiDefinition.fromInline(def),
    });
    (this.api.node.defaultChild as CfnRestApi).addDependsOn((alias.node.defaultChild as CfnAlias));

    alias.addPermission('APIGWPermission', {
     action: 'lambda:InvokeFunction',
     principal: new ServicePrincipal('apigateway.amazonaws.com'),
     sourceArn: this.api.arnForExecuteApi(),
    });

    const apiDomainName = `cp.api.${props.hostedZone.zoneName}`;
    const certificate = new DnsValidatedCertificate(this, 'CPApiCertificate', {
      domainName: apiDomainName,
      hostedZone: props.hostedZone,
      validation: CertificateValidation.fromDns(props.hostedZone),
    });

    const domain = new DomainName(this, 'ApiDomainName', {
      certificate: certificate,
      domainName: apiDomainName,
      securityPolicy: SecurityPolicy.TLS_1_2,
      mapping: this.api,
    });
    new ARecord(this, 'CustomDomainAliasRecord', {
      zone: props.hostedZone,
      target: RecordTarget.fromAlias(new ApiGatewayDomain(domain)),
      recordName: 'cp.api',
    });
  }
}

export function getOpenApiFile(): JSON {
    const file: string = readFileSync('../ControlPlaneModel/build/smithyprojections/ControlPlaneModel/source/openapi/MurdleControlPlane.openapi.json', 'utf-8');
    return JSON.parse(file);
}
