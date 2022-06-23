import { Stage, StageProps } from "aws-cdk-lib";
import { Construct } from 'constructs';
import { ControlPlaneStack } from "../control-plane/control-plane-stack";
import { WebsiteStack } from "../frontend/website-stack";
import { PersistenceStack } from "../persistence-stack";

export type ServiceStage = 'alpha' | 'prod';

export interface ServiceDeploymentStageProps extends StageProps {
  serviceStage: ServiceStage,
}

export class ServiceDeploymentStage extends Stage {

  constructor(scope: Construct, id: string, props: ServiceDeploymentStageProps) {
    super(scope, id, props);

    const persistenceStack = new PersistenceStack(this, 'MurdlePersistence', {
      serviceStage: props.serviceStage,
    });

    new ControlPlaneStack(this, 'MurdleControlPlane', {
      usersTable: persistenceStack.usersTable,
      lobbyTable: persistenceStack.lobbyTable,
      gameTable: persistenceStack.gameTable,
      hostedZone: persistenceStack.hostedZone,
    });

    new WebsiteStack(this, 'MurdleWebsite', {
      hostedZone: persistenceStack.hostedZone,
    });
  }
}