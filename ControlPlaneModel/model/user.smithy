namespace com.jonnekaunisto.murdle

structure PublicUser {
    @required
    userId: String,
    @required
    userName: String
}

structure UserStructure {
    @required
    userId: String,
    @required
    userName: String,
    @required
    userToken: String,
}

// Create
@auth([])
@http(uri: "/v1/user", method: "POST", code: 200)
operation CreateUser {
    input: CreateUserInput,
    output: CreateUserOutput,
    errors: [ValidationException, InternalServerError]
}

structure CreateUserInput {
    @required
    userName: String,
}

structure CreateUserOutput {
    @required
    user: UserStructure
}

// Update
@http(uri: "/v1/user/{userId}", method: "POST", code: 200)
operation UpdateUser {
    input: UpdateUserInput,
    output: UpdateUserOutput,
    errors: [ValidationException, AccessDeniedException, ResourceNotFoundException, InternalServerError]
}

structure UpdateUserInput {
    @required
    @httpLabel
    userId: String,

    @required
    userName: String,
}

structure UpdateUserOutput {
    @required
    user: UserStructure
}