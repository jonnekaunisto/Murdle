namespace com.jonnekaunisto.murdle


@error("client")
@httpError(400)
structure ValidationException {
    @required
    message: String
}

@error("client")
@httpError(403)
structure AccessDeniedException {
    @required
    message: String
}

@error("client")
@httpError(404)
structure ResourceNotFoundException {
    @required
    message: String
}

@error("server")
@httpError(500)
@retryable
structure InternalServerError {
    @required
    message: String
}