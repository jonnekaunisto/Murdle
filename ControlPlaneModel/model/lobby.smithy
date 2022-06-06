namespace com.jonnekaunisto.murdle

structure LobbyStructure {
    @required
    lobbyId: String,
    @required
    ownerUserId: String,
    @required
    players: PlayersList,
}

// Create
@http(uri: "/v1/lobby", method: "POST", code: 200)
operation CreateLobby {
    input: CreateLobbyInput,
    output: CreateLobbyOutput,
    errors: [ValidationException, InternalServerError]
}

structure CreateLobbyInput {
}

structure CreateLobbyOutput {
    @required
    lobby: LobbyStructure
}

// Join/Describe
@http(uri: "/v1/lobby/{lobbyId}", method: "POST", code: 200)
operation JoinLobby {
    input: JoinLobbyInput,
    output: JoinLobbyOutput,
    errors: [ValidationException, AccessDeniedException, ResourceNotFoundException, InternalServerError]
}

structure JoinLobbyInput {
    @required
    @httpLabel
    lobbyId: String,
}

structure JoinLobbyOutput {
    @required
    lobby: LobbyStructure
}

list PlayersList {
    member: PublicUser
}