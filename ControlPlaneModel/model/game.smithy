namespace com.jonnekaunisto.murdle

structure Score {
    @required
    userId: String,
    @required
    score: String,
    @required
    totalTime: String,
}

structure Round {
    @required
    startTime: String,
    @required
    endTime: String,
    @required
    status: RoundStatus,
}

structure GameStructure {
    @required
    gameId: String,
    @required
    scores: ScoresList,
    @required
    players: PlayersList,
    @required
    totalRounds: Integer,
    @required
    rounds: RoundsList,
    @required
    lobbyId: String,
}

// Create
@http(uri: "/v1/game", method: "POST", code: 200)
operation StartGame {
    input: StartGameInput,
    output: StartGameOutput,
    errors: [ValidationException, InternalServerError]
}

structure StartGameInput {
    lobbyId: String,
}

structure StartGameOutput {
    @required
    game: GameStructure
}

// Describe
@readonly
@http(uri: "/v1/game/{gameId}", method: "GET", code: 200)
operation DescribeGame {
    input: DescribeGameInput,
    output: DescribeGameOutput,
    errors: [ValidationException, AccessDeniedException, ResourceNotFoundException, InternalServerError]
}

structure DescribeGameInput {
    @required
    @httpLabel
    gameId: String,
}

structure DescribeGameOutput {
    @required
    game: GameStructure
}

list PlayersList {
    member: PublicUser
}

list ScoresList {
    member: Score
}

list RoundsList {
    member: Round
}

@enum([
    {
        value: "NOT_STARTED",
        name: "NOT_STARTED"
    },
    {
        value: "IN_PROGRESS",
        name: "IN_PROGRESS"
    },
    {
        value: "DONE",
        name: "DONE"
    }
])
string RoundStatus