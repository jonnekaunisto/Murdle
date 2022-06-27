import { ResponseContext, RequestContext, HttpFile } from '../http/http';
import * as models from '../models/all';
import { Configuration} from '../configuration'

import { AccessDeniedExceptionResponseContent } from '../models/AccessDeniedExceptionResponseContent';
import { AdminRemoveFromLobbyResponseContent } from '../models/AdminRemoveFromLobbyResponseContent';
import { CreateLobbyResponseContent } from '../models/CreateLobbyResponseContent';
import { CreateUserRequestContent } from '../models/CreateUserRequestContent';
import { CreateUserResponseContent } from '../models/CreateUserResponseContent';
import { CurrentPlayerRoundState } from '../models/CurrentPlayerRoundState';
import { DescribeGameResponseContent } from '../models/DescribeGameResponseContent';
import { GameStructure } from '../models/GameStructure';
import { GuessedLetterResult } from '../models/GuessedLetterResult';
import { InternalServerErrorResponseContent } from '../models/InternalServerErrorResponseContent';
import { JoinLobbyResponseContent } from '../models/JoinLobbyResponseContent';
import { LeaveLobbyResponseContent } from '../models/LeaveLobbyResponseContent';
import { LetterStatus } from '../models/LetterStatus';
import { LobbyStructure } from '../models/LobbyStructure';
import { PlayerGuess } from '../models/PlayerGuess';
import { PlayerScore } from '../models/PlayerScore';
import { PublicUser } from '../models/PublicUser';
import { ResourceNotFoundExceptionResponseContent } from '../models/ResourceNotFoundExceptionResponseContent';
import { Round } from '../models/Round';
import { RoundStatus } from '../models/RoundStatus';
import { StartGameRequestContent } from '../models/StartGameRequestContent';
import { StartGameResponseContent } from '../models/StartGameResponseContent';
import { SubmitGameGuessRequestContent } from '../models/SubmitGameGuessRequestContent';
import { SubmitGameGuessResponseContent } from '../models/SubmitGameGuessResponseContent';
import { UpdateUserRequestContent } from '../models/UpdateUserRequestContent';
import { UpdateUserResponseContent } from '../models/UpdateUserResponseContent';
import { UserStructure } from '../models/UserStructure';
import { ValidationExceptionResponseContent } from '../models/ValidationExceptionResponseContent';
import { ObservableCORSApi } from './ObservableAPI';

import { CORSApiRequestFactory, CORSApiResponseProcessor} from "../apis/CORSApi";
export class PromiseCORSApi {
    private api: ObservableCORSApi

    public constructor(
        configuration: Configuration,
        requestFactory?: CORSApiRequestFactory,
        responseProcessor?: CORSApiResponseProcessor
    ) {
        this.api = new ObservableCORSApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Handles CORS-preflight requests
     * @param lobbyId 
     * @param userId 
     */
    public corsV1AdminLobbyLobbyidUserUserid(lobbyId: string, userId: string, _options?: Configuration): Promise<void> {
        const result = this.api.corsV1AdminLobbyLobbyidUserUserid(lobbyId, userId, _options);
        return result.toPromise();
    }

    /**
     * Handles CORS-preflight requests
     */
    public corsV1Game(_options?: Configuration): Promise<void> {
        const result = this.api.corsV1Game(_options);
        return result.toPromise();
    }

    /**
     * Handles CORS-preflight requests
     * @param gameId 
     */
    public corsV1GameGameid(gameId: string, _options?: Configuration): Promise<void> {
        const result = this.api.corsV1GameGameid(gameId, _options);
        return result.toPromise();
    }

    /**
     * Handles CORS-preflight requests
     * @param gameId 
     */
    public corsV1GameGameidGuess(gameId: string, _options?: Configuration): Promise<void> {
        const result = this.api.corsV1GameGameidGuess(gameId, _options);
        return result.toPromise();
    }

    /**
     * Handles CORS-preflight requests
     */
    public corsV1Lobby(_options?: Configuration): Promise<void> {
        const result = this.api.corsV1Lobby(_options);
        return result.toPromise();
    }

    /**
     * Handles CORS-preflight requests
     * @param lobbyId 
     */
    public corsV1LobbyLobbyid(lobbyId: string, _options?: Configuration): Promise<void> {
        const result = this.api.corsV1LobbyLobbyid(lobbyId, _options);
        return result.toPromise();
    }

    /**
     * Handles CORS-preflight requests
     */
    public corsV1User(_options?: Configuration): Promise<void> {
        const result = this.api.corsV1User(_options);
        return result.toPromise();
    }

    /**
     * Handles CORS-preflight requests
     * @param userId 
     */
    public corsV1UserUserid(userId: string, _options?: Configuration): Promise<void> {
        const result = this.api.corsV1UserUserid(userId, _options);
        return result.toPromise();
    }


}



import { ObservableDefaultApi } from './ObservableAPI';

import { DefaultApiRequestFactory, DefaultApiResponseProcessor} from "../apis/DefaultApi";
export class PromiseDefaultApi {
    private api: ObservableDefaultApi

    public constructor(
        configuration: Configuration,
        requestFactory?: DefaultApiRequestFactory,
        responseProcessor?: DefaultApiResponseProcessor
    ) {
        this.api = new ObservableDefaultApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * @param lobbyId 
     * @param userId 
     */
    public adminRemoveFromLobby(lobbyId: string, userId: string, _options?: Configuration): Promise<AdminRemoveFromLobbyResponseContent> {
        const result = this.api.adminRemoveFromLobby(lobbyId, userId, _options);
        return result.toPromise();
    }

    /**
     */
    public createLobby(_options?: Configuration): Promise<CreateLobbyResponseContent> {
        const result = this.api.createLobby(_options);
        return result.toPromise();
    }

    /**
     * @param createUserRequestContent 
     */
    public createUser(createUserRequestContent: CreateUserRequestContent, _options?: Configuration): Promise<CreateUserResponseContent> {
        const result = this.api.createUser(createUserRequestContent, _options);
        return result.toPromise();
    }

    /**
     * @param gameId 
     */
    public describeGame(gameId: string, _options?: Configuration): Promise<DescribeGameResponseContent> {
        const result = this.api.describeGame(gameId, _options);
        return result.toPromise();
    }

    /**
     * @param lobbyId 
     */
    public joinLobby(lobbyId: string, _options?: Configuration): Promise<JoinLobbyResponseContent> {
        const result = this.api.joinLobby(lobbyId, _options);
        return result.toPromise();
    }

    /**
     * @param lobbyId 
     */
    public leaveLobby(lobbyId: string, _options?: Configuration): Promise<LeaveLobbyResponseContent> {
        const result = this.api.leaveLobby(lobbyId, _options);
        return result.toPromise();
    }

    /**
     * @param startGameRequestContent 
     */
    public startGame(startGameRequestContent: StartGameRequestContent, _options?: Configuration): Promise<StartGameResponseContent> {
        const result = this.api.startGame(startGameRequestContent, _options);
        return result.toPromise();
    }

    /**
     * @param gameId 
     * @param submitGameGuessRequestContent 
     */
    public submitGameGuess(gameId: string, submitGameGuessRequestContent: SubmitGameGuessRequestContent, _options?: Configuration): Promise<SubmitGameGuessResponseContent> {
        const result = this.api.submitGameGuess(gameId, submitGameGuessRequestContent, _options);
        return result.toPromise();
    }

    /**
     * @param userId 
     * @param updateUserRequestContent 
     */
    public updateUser(userId: string, updateUserRequestContent: UpdateUserRequestContent, _options?: Configuration): Promise<UpdateUserResponseContent> {
        const result = this.api.updateUser(userId, updateUserRequestContent, _options);
        return result.toPromise();
    }


}



