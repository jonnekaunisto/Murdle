import { Stack, StackProps } from "aws-cdk-lib";
import { CodeBuildStep, CodePipeline, CodePipelineSource } from "aws-cdk-lib/pipelines";
import { ServiceDeploymentStage } from "./service-deployment-stage";
import { Construct } from 'constructs';

export class MurdleServicePipeline extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const commands: string[] = [
      "cd ../../infrastructure",
      "npm ci",
      "npm run build",
      "npx cdk synth"
    ];

    const pipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: 'MurdleServicePipeline',
      synth: new CodeBuildStep('Synth', {
        input: CodePipelineSource.gitHub('jonnekaunisto/Murdle', 'main'),
        commands: commands,
        primaryOutputDirectory: 'infrastructure/cdk.out',
      }),
      dockerEnabledForSynth: true,
      crossAccountKeys: true,
    });

    pipeline.addStage(new ServiceDeploymentStage(this, 'alpha', {
      env: {
        account: '714313996820',
        region: 'us-east-1',
      },
      serviceStage: 'alpha',
    }));

    pipeline.addStage(new ServiceDeploymentStage(this, 'prod', {
      env: {
        account: '731268853614',
        region: 'us-east-1',
      },
      serviceStage: 'prod',
    }));
  }
}