import { ResponseContext, RequestContext, HttpFile } from '../http/http';
import * as models from '../models/all';
import { Configuration} from '../configuration'
import { Observable, of, from } from '../rxjsStub';
import {mergeMap, map} from  '../rxjsStub';
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

import { CORSApiRequestFactory, CORSApiResponseProcessor} from "../apis/CORSApi";
export class ObservableCORSApi {
    private requestFactory: CORSApiRequestFactory;
    private responseProcessor: CORSApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: CORSApiRequestFactory,
        responseProcessor?: CORSApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new CORSApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new CORSApiResponseProcessor();
    }

    /**
     * Handles CORS-preflight requests
     * @param lobbyId 
     * @param userId 
     */
    public corsV1AdminLobbyLobbyidUserUserid(lobbyId: string, userId: string, _options?: Configuration): Observable<void> {
        const requestContextPromise = this.requestFactory.corsV1AdminLobbyLobbyidUserUserid(lobbyId, userId, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.corsV1AdminLobbyLobbyidUserUserid(rsp)));
            }));
    }
 
    /**
     * Handles CORS-preflight requests
     */
    public corsV1Game(_options?: Configuration): Observable<void> {
        const requestContextPromise = this.requestFactory.corsV1Game(_options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.corsV1Game(rsp)));
            }));
    }
 
    /**
     * Handles CORS-preflight requests
     * @param gameId 
     */
    public corsV1GameGameid(gameId: string, _options?: Configuration): Observable<void> {
        const requestContextPromise = this.requestFactory.corsV1GameGameid(gameId, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.corsV1GameGameid(rsp)));
            }));
    }
 
    /**
     * Handles CORS-preflight requests
     * @param gameId 
     */
    public corsV1GameGameidGuess(gameId: string, _options?: Configuration): Observable<void> {
        const requestContextPromise = this.requestFactory.corsV1GameGameidGuess(gameId, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.corsV1GameGameidGuess(rsp)));
            }));
    }
 
    /**
     * Handles CORS-preflight requests
     */
    public corsV1Lobby(_options?: Configuration): Observable<void> {
        const requestContextPromise = this.requestFactory.corsV1Lobby(_options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.corsV1Lobby(rsp)));
            }));
    }
 
    /**
     * Handles CORS-preflight requests
     * @param lobbyId 
     */
    public corsV1LobbyLobbyid(lobbyId: string, _options?: Configuration): Observable<void> {
        const requestContextPromise = this.requestFactory.corsV1LobbyLobbyid(lobbyId, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.corsV1LobbyLobbyid(rsp)));
            }));
    }
 
    /**
     * Handles CORS-preflight requests
     */
    public corsV1User(_options?: Configuration): Observable<void> {
        const requestContextPromise = this.requestFactory.corsV1User(_options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.corsV1User(rsp)));
            }));
    }
 
    /**
     * Handles CORS-preflight requests
     * @param userId 
     */
    public corsV1UserUserid(userId: string, _options?: Configuration): Observable<void> {
        const requestContextPromise = this.requestFactory.corsV1UserUserid(userId, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.corsV1UserUserid(rsp)));
            }));
    }
 
}

import { DefaultApiRequestFactory, DefaultApiResponseProcessor} from "../apis/DefaultApi";
export class ObservableDefaultApi {
    private requestFactory: DefaultApiRequestFactory;
    private responseProcessor: DefaultApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: DefaultApiRequestFactory,
        responseProcessor?: DefaultApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new DefaultApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new DefaultApiResponseProcessor();
    }

    /**
     * @param lobbyId 
     * @param userId 
     */
    public adminRemoveFromLobby(lobbyId: string, userId: string, _options?: Configuration): Observable<AdminRemoveFromLobbyResponseContent> {
        const requestContextPromise = this.requestFactory.adminRemoveFromLobby(lobbyId, userId, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.adminRemoveFromLobby(rsp)));
            }));
    }
 
    /**
     */
    public createLobby(_options?: Configuration): Observable<CreateLobbyResponseContent> {
        const requestContextPromise = this.requestFactory.createLobby(_options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.createLobby(rsp)));
            }));
    }
 
    /**
     * @param createUserRequestContent 
     */
    public createUser(createUserRequestContent: CreateUserRequestContent, _options?: Configuration): Observable<CreateUserResponseContent> {
        const requestContextPromise = this.requestFactory.createUser(createUserRequestContent, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.createUser(rsp)));
            }));
    }
 
    /**
     * @param gameId 
     */
    public describeGame(gameId: string, _options?: Configuration): Observable<DescribeGameResponseContent> {
        const requestContextPromise = this.requestFactory.describeGame(gameId, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.describeGame(rsp)));
            }));
    }
 
    /**
     * @param lobbyId 
     */
    public joinLobby(lobbyId: string, _options?: Configuration): Observable<JoinLobbyResponseContent> {
        const requestContextPromise = this.requestFactory.joinLobby(lobbyId, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.joinLobby(rsp)));
            }));
    }
 
    /**
     * @param lobbyId 
     */
    public leaveLobby(lobbyId: string, _options?: Configuration): Observable<LeaveLobbyResponseContent> {
        const requestContextPromise = this.requestFactory.leaveLobby(lobbyId, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.leaveLobby(rsp)));
            }));
    }
 
    /**
     * @param startGameRequestContent 
     */
    public startGame(startGameRequestContent: StartGameRequestContent, _options?: Configuration): Observable<StartGameResponseContent> {
        const requestContextPromise = this.requestFactory.startGame(startGameRequestContent, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.startGame(rsp)));
            }));
    }
 
    /**
     * @param gameId 
     * @param submitGameGuessRequestContent 
     */
    public submitGameGuess(gameId: string, submitGameGuessRequestContent: SubmitGameGuessRequestContent, _options?: Configuration): Observable<SubmitGameGuessResponseContent> {
        const requestContextPromise = this.requestFactory.submitGameGuess(gameId, submitGameGuessRequestContent, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.submitGameGuess(rsp)));
            }));
    }
 
    /**
     * @param userId 
     * @param updateUserRequestContent 
     */
    public updateUser(userId: string, updateUserRequestContent: UpdateUserRequestContent, _options?: Configuration): Observable<UpdateUserResponseContent> {
        const requestContextPromise = this.requestFactory.updateUser(userId, updateUserRequestContent, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.updateUser(rsp)));
            }));
    }
 
}
