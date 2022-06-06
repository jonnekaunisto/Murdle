namespace com.jonnekaunisto.murdle

use aws.protocols#restJson1
use aws.apigateway#requestValidator

@restJson1
@cors(additionalAllowedHeaders: ["content-type"])
@aws.apigateway#integration(
    type: "aws_proxy",
    uri: "arn:aws:apigateway:${AWS::Region}:lambda:path/2015-03-31/functions/${ControlPlaneLambdaAlias}/invocations",
    httpMethod: "POST",
)
@httpApiKeyAuth(name: "X-User-Token", in: "header")
@requestValidator("full")
service MurdleControlPlane {
    version: "0.0.1", //has to be in format %d.%d.%d for code gen to work
    operations: [
        //User
        CreateUser, UpdateUser,
        //Lobby
        CreateLobby, JoinLobby,
        //Game
        StartGame, DescribeGame,
        //Game Actions
        SubmitGameGuess,
    ]
}