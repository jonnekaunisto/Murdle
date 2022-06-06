// TODO: better import syntax?
import { BaseAPIRequestFactory, RequiredError } from './baseapi';
import {Configuration} from '../configuration';
import { RequestContext, HttpMethod, ResponseContext, HttpFile} from '../http/http';
import {ObjectSerializer} from '../models/ObjectSerializer';
import {ApiException} from './exception';
import {isCodeInRange} from '../util';

import { AccessDeniedExceptionResponseContent } from '../models/AccessDeniedExceptionResponseContent';
import { CreateLobbyResponseContent } from '../models/CreateLobbyResponseContent';
import { CreateUserRequestContent } from '../models/CreateUserRequestContent';
import { CreateUserResponseContent } from '../models/CreateUserResponseContent';
import { DescribeGameResponseContent } from '../models/DescribeGameResponseContent';
import { InternalServerErrorResponseContent } from '../models/InternalServerErrorResponseContent';
import { JoinLobbyResponseContent } from '../models/JoinLobbyResponseContent';
import { ResourceNotFoundExceptionResponseContent } from '../models/ResourceNotFoundExceptionResponseContent';
import { StartGameResponseContent } from '../models/StartGameResponseContent';
import { SubmitGameGuessRequestContent } from '../models/SubmitGameGuessRequestContent';
import { SubmitGameGuessResponseContent } from '../models/SubmitGameGuessResponseContent';
import { UpdateUserRequestContent } from '../models/UpdateUserRequestContent';
import { UpdateUserResponseContent } from '../models/UpdateUserResponseContent';
import { ValidationExceptionResponseContent } from '../models/ValidationExceptionResponseContent';

/**
 * no description
 */
export class DefaultApiRequestFactory extends BaseAPIRequestFactory {

    /**
     */
    public async createLobby(_options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // Path Params
        const localVarPath = '/v1/lobby';

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.POST);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params

        // Header Params

        // Form Params


        // Body Params

        let authMethod = null;
        // Apply auth methods
        authMethod = _config.authMethods["smithy.api.httpApiKeyAuth"]
        if (authMethod) {
            await authMethod.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * @param createUserRequestContent 
     */
    public async createUser(createUserRequestContent: CreateUserRequestContent, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'createUserRequestContent' is not null or undefined
        if (createUserRequestContent === null || createUserRequestContent === undefined) {
            throw new RequiredError('Required parameter createUserRequestContent was null or undefined when calling createUser.');
        }


        // Path Params
        const localVarPath = '/v1/user';

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.POST);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params

        // Header Params

        // Form Params


        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([
            "application/json"
        ]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(createUserRequestContent, "CreateUserRequestContent", ""),
            contentType
        );
        requestContext.setBody(serializedBody);

        // Apply auth methods

        return requestContext;
    }

    /**
     * @param gameId 
     */
    public async describeGame(gameId: string, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'gameId' is not null or undefined
        if (gameId === null || gameId === undefined) {
            throw new RequiredError('Required parameter gameId was null or undefined when calling describeGame.');
        }


        // Path Params
        const localVarPath = '/v1/game/{gameId}'
            .replace('{' + 'gameId' + '}', encodeURIComponent(String(gameId)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.GET);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params

        // Header Params

        // Form Params


        // Body Params

        let authMethod = null;
        // Apply auth methods
        authMethod = _config.authMethods["smithy.api.httpApiKeyAuth"]
        if (authMethod) {
            await authMethod.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * @param lobbyId 
     */
    public async joinLobby(lobbyId: string, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'lobbyId' is not null or undefined
        if (lobbyId === null || lobbyId === undefined) {
            throw new RequiredError('Required parameter lobbyId was null or undefined when calling joinLobby.');
        }


        // Path Params
        const localVarPath = '/v1/lobby/{lobbyId}'
            .replace('{' + 'lobbyId' + '}', encodeURIComponent(String(lobbyId)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.POST);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params

        // Header Params

        // Form Params


        // Body Params

        let authMethod = null;
        // Apply auth methods
        authMethod = _config.authMethods["smithy.api.httpApiKeyAuth"]
        if (authMethod) {
            await authMethod.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     */
    public async startGame(_options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // Path Params
        const localVarPath = '/v1/game';

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.POST);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params

        // Header Params

        // Form Params


        // Body Params

        let authMethod = null;
        // Apply auth methods
        authMethod = _config.authMethods["smithy.api.httpApiKeyAuth"]
        if (authMethod) {
            await authMethod.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * @param gameId 
     * @param submitGameGuessRequestContent 
     */
    public async submitGameGuess(gameId: string, submitGameGuessRequestContent: SubmitGameGuessRequestContent, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'gameId' is not null or undefined
        if (gameId === null || gameId === undefined) {
            throw new RequiredError('Required parameter gameId was null or undefined when calling submitGameGuess.');
        }


        // verify required parameter 'submitGameGuessRequestContent' is not null or undefined
        if (submitGameGuessRequestContent === null || submitGameGuessRequestContent === undefined) {
            throw new RequiredError('Required parameter submitGameGuessRequestContent was null or undefined when calling submitGameGuess.');
        }


        // Path Params
        const localVarPath = '/v1/game/{gameId}/guess'
            .replace('{' + 'gameId' + '}', encodeURIComponent(String(gameId)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.POST);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params

        // Header Params

        // Form Params


        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([
            "application/json"
        ]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(submitGameGuessRequestContent, "SubmitGameGuessRequestContent", ""),
            contentType
        );
        requestContext.setBody(serializedBody);

        let authMethod = null;
        // Apply auth methods
        authMethod = _config.authMethods["smithy.api.httpApiKeyAuth"]
        if (authMethod) {
            await authMethod.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * @param userId 
     * @param updateUserRequestContent 
     */
    public async updateUser(userId: string, updateUserRequestContent: UpdateUserRequestContent, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'userId' is not null or undefined
        if (userId === null || userId === undefined) {
            throw new RequiredError('Required parameter userId was null or undefined when calling updateUser.');
        }


        // verify required parameter 'updateUserRequestContent' is not null or undefined
        if (updateUserRequestContent === null || updateUserRequestContent === undefined) {
            throw new RequiredError('Required parameter updateUserRequestContent was null or undefined when calling updateUser.');
        }


        // Path Params
        const localVarPath = '/v1/user/{userId}'
            .replace('{' + 'userId' + '}', encodeURIComponent(String(userId)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.POST);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params

        // Header Params

        // Form Params


        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([
            "application/json"
        ]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(updateUserRequestContent, "UpdateUserRequestContent", ""),
            contentType
        );
        requestContext.setBody(serializedBody);

        let authMethod = null;
        // Apply auth methods
        authMethod = _config.authMethods["smithy.api.httpApiKeyAuth"]
        if (authMethod) {
            await authMethod.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

}

export class DefaultApiResponseProcessor {

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to createLobby
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async createLobby(response: ResponseContext): Promise<CreateLobbyResponseContent > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: CreateLobbyResponseContent = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "CreateLobbyResponseContent", ""
            ) as CreateLobbyResponseContent;
            return body;
        }
        if (isCodeInRange("400", response.httpStatusCode)) {
            const body: ValidationExceptionResponseContent = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ValidationExceptionResponseContent", ""
            ) as ValidationExceptionResponseContent;
            throw new ApiException<ValidationExceptionResponseContent>(400, body);
        }
        if (isCodeInRange("500", response.httpStatusCode)) {
            const body: InternalServerErrorResponseContent = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "InternalServerErrorResponseContent", ""
            ) as InternalServerErrorResponseContent;
            throw new ApiException<InternalServerErrorResponseContent>(500, body);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: CreateLobbyResponseContent = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "CreateLobbyResponseContent", ""
            ) as CreateLobbyResponseContent;
            return body;
        }

        let body = response.body || "";
        throw new ApiException<string>(response.httpStatusCode, "Unknown API Status Code!\nBody: \"" + body + "\"");
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to createUser
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async createUser(response: ResponseContext): Promise<CreateUserResponseContent > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: CreateUserResponseContent = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "CreateUserResponseContent", ""
            ) as CreateUserResponseContent;
            return body;
        }
        if (isCodeInRange("400", response.httpStatusCode)) {
            const body: ValidationExceptionResponseContent = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ValidationExceptionResponseContent", ""
            ) as ValidationExceptionResponseContent;
            throw new ApiException<ValidationExceptionResponseContent>(400, body);
        }
        if (isCodeInRange("500", response.httpStatusCode)) {
            const body: InternalServerErrorResponseContent = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "InternalServerErrorResponseContent", ""
            ) as InternalServerErrorResponseContent;
            throw new ApiException<InternalServerErrorResponseContent>(500, body);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: CreateUserResponseContent = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "CreateUserResponseContent", ""
            ) as CreateUserResponseContent;
            return body;
        }

        let body = response.body || "";
        throw new ApiException<string>(response.httpStatusCode, "Unknown API Status Code!\nBody: \"" + body + "\"");
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to describeGame
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async describeGame(response: ResponseContext): Promise<DescribeGameResponseContent > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: DescribeGameResponseContent = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "DescribeGameResponseContent", ""
            ) as DescribeGameResponseContent;
            return body;
        }
        if (isCodeInRange("400", response.httpStatusCode)) {
            const body: ValidationExceptionResponseContent = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ValidationExceptionResponseContent", ""
            ) as ValidationExceptionResponseContent;
            throw new ApiException<ValidationExceptionResponseContent>(400, body);
        }
        if (isCodeInRange("403", response.httpStatusCode)) {
            const body: AccessDeniedExceptionResponseContent = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "AccessDeniedExceptionResponseContent", ""
            ) as AccessDeniedExceptionResponseContent;
            throw new ApiException<AccessDeniedExceptionResponseContent>(403, body);
        }
        if (isCodeInRange("404", response.httpStatusCode)) {
            const body: ResourceNotFoundExceptionResponseContent = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ResourceNotFoundExceptionResponseContent", ""
            ) as ResourceNotFoundExceptionResponseContent;
            throw new ApiException<ResourceNotFoundExceptionResponseContent>(404, body);
        }
        if (isCodeInRange("500", response.httpStatusCode)) {
            const body: InternalServerErrorResponseContent = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "InternalServerErrorResponseContent", ""
            ) as InternalServerErrorResponseContent;
            throw new ApiException<InternalServerErrorResponseContent>(500, body);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: DescribeGameResponseContent = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "DescribeGameResponseContent", ""
            ) as DescribeGameResponseContent;
            return body;
        }

        let body = response.body || "";
        throw new ApiException<string>(response.httpStatusCode, "Unknown API Status Code!\nBody: \"" + body + "\"");
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to joinLobby
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async joinLobby(response: ResponseContext): Promise<JoinLobbyResponseContent > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: JoinLobbyResponseContent = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "JoinLobbyResponseContent", ""
            ) as JoinLobbyResponseContent;
            return body;
        }
        if (isCodeInRange("400", response.httpStatusCode)) {
            const body: ValidationExceptionResponseContent = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ValidationExceptionResponseContent", ""
            ) as ValidationExceptionResponseContent;
            throw new ApiException<ValidationExceptionResponseContent>(400, body);
        }
        if (isCodeInRange("403", response.httpStatusCode)) {
            const body: AccessDeniedExceptionResponseContent = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "AccessDeniedExceptionResponseContent", ""
            ) as AccessDeniedExceptionResponseContent;
            throw new ApiException<AccessDeniedExceptionResponseContent>(403, body);
        }
        if (isCodeInRange("404", response.httpStatusCode)) {
            const body: ResourceNotFoundExceptionResponseContent = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ResourceNotFoundExceptionResponseContent", ""
            ) as ResourceNotFoundExceptionResponseContent;
            throw new ApiException<ResourceNotFoundExceptionResponseContent>(404, body);
        }
        if (isCodeInRange("500", response.httpStatusCode)) {
            const body: InternalServerErrorResponseContent = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "InternalServerErrorResponseContent", ""
            ) as InternalServerErrorResponseContent;
            throw new ApiException<InternalServerErrorResponseContent>(500, body);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: JoinLobbyResponseContent = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "JoinLobbyResponseContent", ""
            ) as JoinLobbyResponseContent;
            return body;
        }

        let body = response.body || "";
        throw new ApiException<string>(response.httpStatusCode, "Unknown API Status Code!\nBody: \"" + body + "\"");
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to startGame
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async startGame(response: ResponseContext): Promise<StartGameResponseContent > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: StartGameResponseContent = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "StartGameResponseContent", ""
            ) as StartGameResponseContent;
            return body;
        }
        if (isCodeInRange("400", response.httpStatusCode)) {
            const body: ValidationExceptionResponseContent = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ValidationExceptionResponseContent", ""
            ) as ValidationExceptionResponseContent;
            throw new ApiException<ValidationExceptionResponseContent>(400, body);
        }
        if (isCodeInRange("500", response.httpStatusCode)) {
            const body: InternalServerErrorResponseContent = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "InternalServerErrorResponseContent", ""
            ) as InternalServerErrorResponseContent;
            throw new ApiException<InternalServerErrorResponseContent>(500, body);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: StartGameResponseContent = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "StartGameResponseContent", ""
            ) as StartGameResponseContent;
            return body;
        }

        let body = response.body || "";
        throw new ApiException<string>(response.httpStatusCode, "Unknown API Status Code!\nBody: \"" + body + "\"");
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to submitGameGuess
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async submitGameGuess(response: ResponseContext): Promise<SubmitGameGuessResponseContent > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: SubmitGameGuessResponseContent = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "SubmitGameGuessResponseContent", ""
            ) as SubmitGameGuessResponseContent;
            return body;
        }
        if (isCodeInRange("400", response.httpStatusCode)) {
            const body: ValidationExceptionResponseContent = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ValidationExceptionResponseContent", ""
            ) as ValidationExceptionResponseContent;
            throw new ApiException<ValidationExceptionResponseContent>(400, body);
        }
        if (isCodeInRange("500", response.httpStatusCode)) {
            const body: InternalServerErrorResponseContent = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "InternalServerErrorResponseContent", ""
            ) as InternalServerErrorResponseContent;
            throw new ApiException<InternalServerErrorResponseContent>(500, body);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: SubmitGameGuessResponseContent = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "SubmitGameGuessResponseContent", ""
            ) as SubmitGameGuessResponseContent;
            return body;
        }

        let body = response.body || "";
        throw new ApiException<string>(response.httpStatusCode, "Unknown API Status Code!\nBody: \"" + body + "\"");
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to updateUser
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async updateUser(response: ResponseContext): Promise<UpdateUserResponseContent > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: UpdateUserResponseContent = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "UpdateUserResponseContent", ""
            ) as UpdateUserResponseContent;
            return body;
        }
        if (isCodeInRange("400", response.httpStatusCode)) {
            const body: ValidationExceptionResponseContent = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ValidationExceptionResponseContent", ""
            ) as ValidationExceptionResponseContent;
            throw new ApiException<ValidationExceptionResponseContent>(400, body);
        }
        if (isCodeInRange("403", response.httpStatusCode)) {
            const body: AccessDeniedExceptionResponseContent = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "AccessDeniedExceptionResponseContent", ""
            ) as AccessDeniedExceptionResponseContent;
            throw new ApiException<AccessDeniedExceptionResponseContent>(403, body);
        }
        if (isCodeInRange("404", response.httpStatusCode)) {
            const body: ResourceNotFoundExceptionResponseContent = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ResourceNotFoundExceptionResponseContent", ""
            ) as ResourceNotFoundExceptionResponseContent;
            throw new ApiException<ResourceNotFoundExceptionResponseContent>(404, body);
        }
        if (isCodeInRange("500", response.httpStatusCode)) {
            const body: InternalServerErrorResponseContent = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "InternalServerErrorResponseContent", ""
            ) as InternalServerErrorResponseContent;
            throw new ApiException<InternalServerErrorResponseContent>(500, body);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: UpdateUserResponseContent = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "UpdateUserResponseContent", ""
            ) as UpdateUserResponseContent;
            return body;
        }

        let body = response.body || "";
        throw new ApiException<string>(response.httpStatusCode, "Unknown API Status Code!\nBody: \"" + body + "\"");
    }

}
