import { Stack, StackProps } from "aws-cdk-lib";
import { AttributeType, BillingMode, Table } from "aws-cdk-lib/aws-dynamodb";
import { PublicHostedZone} from "aws-cdk-lib/aws-route53";
import { Construct } from 'constructs';
import { ServiceStage } from "./pipeline/service-deployment-stage";

interface PersistenceStackProps extends StackProps {
  serviceStage: ServiceStage,
}

export class PersistenceStack extends Stack {
  private static readonly ROOT_DOMAIN_NAME = 'murdle.jonnekaunisto.com';

  public readonly usersTable: Table;
  public readonly hostedZone: PublicHostedZone;

  public constructor(scope: Construct, id: string, props: PersistenceStackProps) {
    super(scope, id, props);

    this.usersTable = new Table(this, 'UsersTable', {
      tableName: 'MurdleUsers',
      partitionKey: {
        name: 'OwnerId',
        type: AttributeType.STRING,
      },
      billingMode: BillingMode.PAY_PER_REQUEST,
    });
    this.usersTable.addGlobalSecondaryIndex({
      indexName: 'AuthTokenLookup',
      partitionKey: {
        name: 'AuthToken',
        type: AttributeType.STRING,
      },
    });

    this.hostedZone = new PublicHostedZone(this, 'ServiceDomain', {
      zoneName: this.getDomainName(props.serviceStage),
    });
  }

  private getDomainName(serviceStage: string): string {
    if (serviceStage == 'prod') {
      return PersistenceStack.ROOT_DOMAIN_NAME;
    } else {
      return `${serviceStage}.${PersistenceStack.ROOT_DOMAIN_NAME}`;
    }
  }
}