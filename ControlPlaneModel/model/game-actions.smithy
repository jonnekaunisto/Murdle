namespace com.jonnekaunisto.murdle

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
    roundNumber: Integer,

    @required
    guess: String,
}

structure SubmitGameGuessOutput {
    game: GameStructure,
}
