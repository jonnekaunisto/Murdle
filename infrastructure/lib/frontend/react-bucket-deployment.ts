import { spawnSync, SpawnSyncOptions, SpawnSyncReturns } from "child_process";
import { resolve } from "path";
import { AssetHashType, DockerImage, ILocalBundling } from "aws-cdk-lib";
import { IBucket } from "aws-cdk-lib/aws-s3";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import { Construct } from 'constructs';

export interface ReactBucketDeploymentProps {
  readonly destinationBucket: IBucket,
  readonly projectRoot: string,
  readonly environment?: { [key: string]: string },
}

export class ReactBucketDeployment extends Construct {
  constructor(scope: Construct, id: string, props: ReactBucketDeploymentProps) {
    super(scope, id);
    const reactAssets = Source.asset(props.projectRoot, {
      assetHashType: AssetHashType.OUTPUT,
      bundling: {
        image: DockerImage.fromRegistry('dummy'),
        local: this.getLocalBundlingProvider(props),
      }
    });

    new BucketDeployment(this, 'ReactBucketDeployment', {
      destinationBucket: props.destinationBucket,
      sources: [reactAssets],
    });
  }

  private getLocalBundlingProvider(props: ReactBucketDeploymentProps): ILocalBundling {
    return {
      tryBundle(outputDir: string): boolean {
        console.log(outputDir);
        const absoluteProjectPath = resolve(props.projectRoot);
        console.log(absoluteProjectPath);
        const localCommand = `npx next build ${absoluteProjectPath} && npx next export -o ${outputDir} ${absoluteProjectPath}`;
        exec(
          'bash',
          [
            '-c',
            localCommand,
          ],
          {
            env: { ...process.env, ...props.environment },
            stdio: [ // show output
              'ignore', // ignore stdio
              process.stderr, // redirect stdout to stderr
              'inherit', // inherit stderr
            ],
            cwd: absoluteProjectPath,
            windowsVerbatimArguments: false,
          });
        return true;
      }
    };
  }
}

/**
 * Spawn sync with error handling
 */
 export function exec(cmd: string, args: string[], options?: SpawnSyncOptions): SpawnSyncReturns<Buffer> {
  const proc = spawnSync(cmd, args, options);

  if (proc.error) {
    throw proc.error;
  }

  if (proc.status !== 0) {
    if (proc.stdout || proc.stderr) {
      throw new Error(`[Status ${proc.status}] stdout: ${proc.stdout?.toString().trim()}\n\n\nstderr: ${proc.stderr?.toString().trim()}`);
    }
    throw new Error(`${cmd} exited with status ${proc.status}`);
  }

  return proc;
}


