export type ServiceStage = 'alpha' | 'prod';

interface WebisteConfiguration {
  cpEndpoint: string;
  serviceStage: ServiceStage;
}

export function getConfig(): WebisteConfiguration {
  const domainName = window.location.host;
  if (domainName == "murdle.jonnekaunisto.com") {
    return {
      cpEndpoint: "https://cp.api.murdle.jonnekaunisto.com",
      serviceStage: "prod",
    };
  }
  if (domainName == "alpha.murdle.jonnekaunisto.com") {
    return {
      cpEndpoint: "https://cp.api.alpha.murdle.jonnekaunisto.com",
      serviceStage: "alpha",
    };
  }
  if (domainName == "localhost:3000") {
    return {
      cpEndpoint: "https://cp.api.alpha.murdle.jonnekaunisto.com",
      serviceStage: "alpha",
    };
  }
  throw Error("No Configuration found");
}
