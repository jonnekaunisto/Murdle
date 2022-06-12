import { createConfiguration, ServerConfiguration } from 'murdle-control-plane-client';
import { DefaultApi } from 'murdle-control-plane-client';
import { getConfig } from './configuration';

export function createClient(token?: string): DefaultApi {
    const authMethods = token == undefined ? undefined : {
        "smithy.api.httpApiKeyAuth": token,
    };
    const config = getConfig();
    const configuration = createConfiguration({
        baseServer: new ServerConfiguration(config.cpEndpoint, {}),
        authMethods,
    });
    const api: DefaultApi = new DefaultApi(configuration);
    return api;
}