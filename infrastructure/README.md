# Welcome to your CDK TypeScript project

This is a blank project for TypeScript development with CDK.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template
* `cdk deploy --app 'cdk.out/assembly-MurdleServicePipeline-alpha' --profile 714313996820_AdministratorAccess MurdleServicePipeline/alpha/MurdlePersistence` Deploy Alpha Cloud Assembly
* `cdk deploy --app 'cdk.out/assembly-MurdleServicePipeline-prod' --profile 731268853614_AdministratorAccess MurdleServicePipeline/prod/MurdlePersistence` Deploy Prod Cloud Assembly

Stacks that can be deployed are `MurdleControlPlane`, `MurdleWebsite` and `MurdlePersistence`.

## Setting up credentials

Use credentials from SSO: https://docs.aws.amazon.com/toolkit-for-visual-studio/latest/user-guide/sso-credentials.html

The run:
* aws sso login --profile 731268853614_AdministratorAccess
* aws sso login --profile 714313996820_AdministratorAccess