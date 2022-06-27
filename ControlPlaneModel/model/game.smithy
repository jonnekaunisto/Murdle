namespace com.jonnekaunisto.murdle

structure PlayerScore {
    @required
    player: PublicUser,
    @required
    score: Integer,
    @required
    totalTime: Integer,
}

structure Round {
    @required
    startTime: BigInteger,
    @required
    endTime: BigInteger,
    @required
    status: RoundStatus,

    // Only shown after round is over
    wordleWord: String,
}

structure GuessedLetterResult {
    @required
    letter: String,
    @required
    status: LetterStatus,
}

structure PlayerGuess {
    @required
    guessedWord: String,
    @required
    guessLetterResult: GuessedLetterResults
}

structure CurrentPlayerRoundState {
    @required
    playerGuesses: PlayerGuesses
}

structure GameStructure {
    @required
    gameId: String,
    @required
    playerScores: PlayerScoresList,
    @required
    rounds: RoundsList,
    @required
    lobbyId: String,

    @required
    currentPlayerRoundStates: CurrentPlayerRoundStates,
}

// Create
@http(uri: "/v1/game", method: "POST", code: 200)
operation StartGame {
    input: StartGameInput,
    output: StartGameOutput,
    errors: [ValidationException, InternalServerError]
}

structure StartGameInput {
    @required
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

list PlayerScoresList {
    member: PlayerScore
}

list CurrentPlayerRoundStates {
    member: CurrentPlayerRoundState
}

list GuessedLetterResults {
    member: GuessedLetterResult
}

list PlayerGuesses {
    member: PlayerGuess
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


@enum([
    {
        value: "ABSENT",
        name: "ABSENT"
    },
    {
        value: "CORRECT",
        name: "CORRECT"
    },
    {
        value: "PRESENT",
        name: "PRESENT"
    }
])
string LetterStatus