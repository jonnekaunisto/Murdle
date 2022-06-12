import { Duration, Stack } from "aws-cdk-lib";
import { CertificateValidation, DnsValidatedCertificate } from "aws-cdk-lib/aws-certificatemanager";
import { CachePolicy, Distribution, PriceClass, ViewerProtocolPolicy } from "aws-cdk-lib/aws-cloudfront";
import { S3Origin } from "aws-cdk-lib/aws-cloudfront-origins";
import { AnyPrincipal, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { ARecord, HostedZone, RecordTarget } from "aws-cdk-lib/aws-route53";
import { CloudFrontTarget } from "aws-cdk-lib/aws-route53-targets";
import { BlockPublicAccess, Bucket } from "aws-cdk-lib/aws-s3";
import { ReactBucketDeployment } from "./react-bucket-deployment";
import { Construct } from 'constructs';

export interface WebsiteStackProps {
  readonly hostedZone: HostedZone,
}

export class WebsiteStack extends Stack {
  constructor(scope: Construct, id: string, props: WebsiteStackProps) {
    super(scope, id);

    const domainName = props.hostedZone.zoneName;

    // TODO: Make this bucket private
    const bucket = new Bucket(this, 'WebsiteBucket', {
        websiteIndexDocument: 'index.html',
        websiteErrorDocument: '404/index.html',
        blockPublicAccess: new BlockPublicAccess({ restrictPublicBuckets: false }),
    });
    const bucketPolicy = new PolicyStatement({
      actions: ['s3:GetObject'],
      resources: [
        `${bucket.bucketArn}/*`
      ],
      principals: [new AnyPrincipal()],
    });
    bucket.addToResourcePolicy(bucketPolicy);

    new ReactBucketDeployment(this, 'WebsiteAssetsDeployment', {
      destinationBucket: bucket,
      projectRoot: '../Website',
    });

    const certificate = new DnsValidatedCertificate(this, 'WebsiteCertificate', {
      domainName: domainName,
      hostedZone: props.hostedZone,
      validation: CertificateValidation.fromDns(props.hostedZone),
    });

    const cachePolicy = new CachePolicy(this, 'CachePolicy', {
      cachePolicyName: 'FrontendCachePolicy',
      comment: 'Frontend Cache Policy',
      defaultTtl: Duration.minutes(1),
      minTtl: Duration.seconds(1),
      maxTtl: Duration.minutes(1),
    });

    const distribution = new Distribution(this, 'WebsiteDistribution', {
      defaultBehavior: {
        origin: new S3Origin(bucket),
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy: cachePolicy,
      },
      domainNames: [domainName],
      certificate: certificate,
      priceClass: PriceClass.PRICE_CLASS_100,
    });

    new ARecord(this, 'CustomDomainAliasRecord', {
      zone: props.hostedZone,
      target: RecordTarget.fromAlias(new CloudFrontTarget(distribution)),
      recordName: domainName,
    });
  }
}
