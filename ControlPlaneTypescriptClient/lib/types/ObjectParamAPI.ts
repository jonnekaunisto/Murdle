import { ResponseContext, RequestContext, HttpFile } from '../http/http';
import * as models from '../models/all';
import { Configuration} from '../configuration'

import { AccessDeniedExceptionResponseContent } from '../models/AccessDeniedExceptionResponseContent';
import { AdminRemoveFromLobbyResponseContent } from '../models/AdminRemoveFromLobbyResponseContent';
import { CreateLobbyResponseContent } from '../models/CreateLobbyResponseContent';
import { CreateUserRequestContent } from '../models/CreateUserRequestContent';
import { CreateUserResponseContent } from '../models/CreateUserResponseContent';
import { DescribeGameResponseContent } from '../models/DescribeGameResponseContent';
import { GameRoundPlayerState } from '../models/GameRoundPlayerState';
import { GameStructure } from '../models/GameStructure';
import { InternalServerErrorResponseContent } from '../models/InternalServerErrorResponseContent';
import { JoinLobbyResponseContent } from '../models/JoinLobbyResponseContent';
import { LeaveLobbyResponseContent } from '../models/LeaveLobbyResponseContent';
import { LobbyStructure } from '../models/LobbyStructure';
import { PlayerRoundStatus } from '../models/PlayerRoundStatus';
import { PublicUser } from '../models/PublicUser';
import { ResourceNotFoundExceptionResponseContent } from '../models/ResourceNotFoundExceptionResponseContent';
import { Round } from '../models/Round';
import { RoundStatus } from '../models/RoundStatus';
import { Score } from '../models/Score';
import { StartGameResponseContent } from '../models/StartGameResponseContent';
import { SubmitGameGuessRequestContent } from '../models/SubmitGameGuessRequestContent';
import { SubmitGameGuessResponseContent } from '../models/SubmitGameGuessResponseContent';
import { UpdateUserRequestContent } from '../models/UpdateUserRequestContent';
import { UpdateUserResponseContent } from '../models/UpdateUserResponseContent';
import { UserStructure } from '../models/UserStructure';
import { ValidationExceptionResponseContent } from '../models/ValidationExceptionResponseContent';

import { ObservableCORSApi } from "./ObservableAPI";
import { CORSApiRequestFactory, CORSApiResponseProcessor} from "../apis/CORSApi";

export interface CORSApiCorsV1AdminLobbyLobbyidUserUseridRequest {
    /**
     * 
     * @type string
     * @memberof CORSApicorsV1AdminLobbyLobbyidUserUserid
     */
    lobbyId: string
    /**
     * 
     * @type string
     * @memberof CORSApicorsV1AdminLobbyLobbyidUserUserid
     */
    userId: string
}

export interface CORSApiCorsV1GameRequest {
}

export interface CORSApiCorsV1GameGameidRequest {
    /**
     * 
     * @type string
     * @memberof CORSApicorsV1GameGameid
     */
    gameId: string
}

export interface CORSApiCorsV1GameGameidGuessRequest {
    /**
     * 
     * @type string
     * @memberof CORSApicorsV1GameGameidGuess
     */
    gameId: string
}

export interface CORSApiCorsV1LobbyRequest {
}

export interface CORSApiCorsV1LobbyLobbyidRequest {
    /**
     * 
     * @type string
     * @memberof CORSApicorsV1LobbyLobbyid
     */
    lobbyId: string
}

export interface CORSApiCorsV1UserRequest {
}

export interface CORSApiCorsV1UserUseridRequest {
    /**
     * 
     * @type string
     * @memberof CORSApicorsV1UserUserid
     */
    userId: string
}

export class ObjectCORSApi {
    private api: ObservableCORSApi

    public constructor(configuration: Configuration, requestFactory?: CORSApiRequestFactory, responseProcessor?: CORSApiResponseProcessor) {
        this.api = new ObservableCORSApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Handles CORS-preflight requests
     * @param param the request object
     */
    public corsV1AdminLobbyLobbyidUserUserid(param: CORSApiCorsV1AdminLobbyLobbyidUserUseridRequest, options?: Configuration): Promise<void> {
        return this.api.corsV1AdminLobbyLobbyidUserUserid(param.lobbyId, param.userId,  options).toPromise();
    }

    /**
     * Handles CORS-preflight requests
     * @param param the request object
     */
    public corsV1Game(param: CORSApiCorsV1GameRequest, options?: Configuration): Promise<void> {
        return this.api.corsV1Game( options).toPromise();
    }

    /**
     * Handles CORS-preflight requests
     * @param param the request object
     */
    public corsV1GameGameid(param: CORSApiCorsV1GameGameidRequest, options?: Configuration): Promise<void> {
        return this.api.corsV1GameGameid(param.gameId,  options).toPromise();
    }

    /**
     * Handles CORS-preflight requests
     * @param param the request object
     */
    public corsV1GameGameidGuess(param: CORSApiCorsV1GameGameidGuessRequest, options?: Configuration): Promise<void> {
        return this.api.corsV1GameGameidGuess(param.gameId,  options).toPromise();
    }

    /**
     * Handles CORS-preflight requests
     * @param param the request object
     */
    public corsV1Lobby(param: CORSApiCorsV1LobbyRequest, options?: Configuration): Promise<void> {
        return this.api.corsV1Lobby( options).toPromise();
    }

    /**
     * Handles CORS-preflight requests
     * @param param the request object
     */
    public corsV1LobbyLobbyid(param: CORSApiCorsV1LobbyLobbyidRequest, options?: Configuration): Promise<void> {
        return this.api.corsV1LobbyLobbyid(param.lobbyId,  options).toPromise();
    }

    /**
     * Handles CORS-preflight requests
     * @param param the request object
     */
    public corsV1User(param: CORSApiCorsV1UserRequest, options?: Configuration): Promise<void> {
        return this.api.corsV1User( options).toPromise();
    }

    /**
     * Handles CORS-preflight requests
     * @param param the request object
     */
    public corsV1UserUserid(param: CORSApiCorsV1UserUseridRequest, options?: Configuration): Promise<void> {
        return this.api.corsV1UserUserid(param.userId,  options).toPromise();
    }

}

import { ObservableDefaultApi } from "./ObservableAPI";
import { DefaultApiRequestFactory, DefaultApiResponseProcessor} from "../apis/DefaultApi";

export interface DefaultApiAdminRemoveFromLobbyRequest {
    /**
     * 
     * @type string
     * @memberof DefaultApiadminRemoveFromLobby
     */
    lobbyId: string
    /**
     * 
     * @type string
     * @memberof DefaultApiadminRemoveFromLobby
     */
    userId: string
}

export interface DefaultApiCreateLobbyRequest {
}

export interface DefaultApiCreateUserRequest {
    /**
     * 
     * @type CreateUserRequestContent
     * @memberof DefaultApicreateUser
     */
    createUserRequestContent: CreateUserRequestContent
}

export interface DefaultApiDescribeGameRequest {
    /**
     * 
     * @type string
     * @memberof DefaultApidescribeGame
     */
    gameId: string
}

export interface DefaultApiJoinLobbyRequest {
    /**
     * 
     * @type string
     * @memberof DefaultApijoinLobby
     */
    lobbyId: string
}

export interface DefaultApiLeaveLobbyRequest {
    /**
     * 
     * @type string
     * @memberof DefaultApileaveLobby
     */
    lobbyId: string
}

export interface DefaultApiStartGameRequest {
}

export interface DefaultApiSubmitGameGuessRequest {
    /**
     * 
     * @type string
     * @memberof DefaultApisubmitGameGuess
     */
    gameId: string
    /**
     * 
     * @type SubmitGameGuessRequestContent
     * @memberof DefaultApisubmitGameGuess
     */
    submitGameGuessRequestContent: SubmitGameGuessRequestContent
}

export interface DefaultApiUpdateUserRequest {
    /**
     * 
     * @type string
     * @memberof DefaultApiupdateUser
     */
    userId: string
    /**
     * 
     * @type UpdateUserRequestContent
     * @memberof DefaultApiupdateUser
     */
    updateUserRequestContent: UpdateUserRequestContent
}

export class ObjectDefaultApi {
    private api: ObservableDefaultApi

    public constructor(configuration: Configuration, requestFactory?: DefaultApiRequestFactory, responseProcessor?: DefaultApiResponseProcessor) {
        this.api = new ObservableDefaultApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * @param param the request object
     */
    public adminRemoveFromLobby(param: DefaultApiAdminRemoveFromLobbyRequest, options?: Configuration): Promise<AdminRemoveFromLobbyResponseContent> {
        return this.api.adminRemoveFromLobby(param.lobbyId, param.userId,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public createLobby(param: DefaultApiCreateLobbyRequest, options?: Configuration): Promise<CreateLobbyResponseContent> {
        return this.api.createLobby( options).toPromise();
    }

    /**
     * @param param the request object
     */
    public createUser(param: DefaultApiCreateUserRequest, options?: Configuration): Promise<CreateUserResponseContent> {
        return this.api.createUser(param.createUserRequestContent,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public describeGame(param: DefaultApiDescribeGameRequest, options?: Configuration): Promise<DescribeGameResponseContent> {
        return this.api.describeGame(param.gameId,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public joinLobby(param: DefaultApiJoinLobbyRequest, options?: Configuration): Promise<JoinLobbyResponseContent> {
        return this.api.joinLobby(param.lobbyId,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public leaveLobby(param: DefaultApiLeaveLobbyRequest, options?: Configuration): Promise<LeaveLobbyResponseContent> {
        return this.api.leaveLobby(param.lobbyId,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public startGame(param: DefaultApiStartGameRequest, options?: Configuration): Promise<StartGameResponseContent> {
        return this.api.startGame( options).toPromise();
    }

    /**
     * @param param the request object
     */
    public submitGameGuess(param: DefaultApiSubmitGameGuessRequest, options?: Configuration): Promise<SubmitGameGuessResponseContent> {
        return this.api.submitGameGuess(param.gameId, param.submitGameGuessRequestContent,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public updateUser(param: DefaultApiUpdateUserRequest, options?: Configuration): Promise<UpdateUserResponseContent> {
        return this.api.updateUser(param.userId, param.updateUserRequestContent,  options).toPromise();
    }

}
