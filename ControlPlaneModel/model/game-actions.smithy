namespace com.jonnekaunisto.murdle

structure GameRoundPlayerState {
    guessedWords: Guesses,
    roundPlayerStatus: PlayerRoundStatus,
}

// Submit Guess
@http(uri: "/v1/game/{gameId}/guess", method: "POST", code: 200)
operation SubmitGameGuess {
    input: SubmitGameGuessInput,
    output: SubmitGameGuessOutput,
    errors: [ValidationException, InternalServerError]
}

structure SubmitGameGuessInput {
    @required
    @httpLabel
    gameId: String,

    @required
    guess: String,
}

structure SubmitGameGuessOutput {
    gameRoundPlayerState: GameRoundPlayerState,
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
string PlayerRoundStatus

list Guesses {
    member: String
}