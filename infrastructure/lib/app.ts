#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { MurdleServicePipeline } from './pipeline/pipeline';

const app = new cdk.App();

new MurdleServicePipeline(app, 'MurdleServicePipeline', {
  env: {
      account: '714313996820',
      region: 'us-east-1',
  }
});