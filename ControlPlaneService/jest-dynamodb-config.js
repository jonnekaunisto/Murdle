module.exports = {
  tables: [
    {
      TableName: `MurdleUsers`,
      KeySchema: [
        { AttributeName: "UserId", KeyType: "HASH" },
      ],
      AttributeDefinitions: [
        { AttributeName: "UserId", AttributeType: "S" },
        { AttributeName: "AuthToken", AttributeType: "S" },
      ],
      ProvisionedThroughput: { ReadCapacityUnits: 4, WriteCapacityUnits: 4 },
      GlobalSecondaryIndexes: [
        {
          IndexName: "AuthTokenLookup",
          KeySchema: [{ AttributeName: "AuthToken", KeyType: "HASH" }],
          Projection: { ProjectionType: "ALL" },
          ProvisionedThroughput: {
            ReadCapacityUnits: 4,
            WriteCapacityUnits: 4,
          },
        },
      ],
    },
    {
      TableName: `MurdleLobby`,
      KeySchema: [
        { AttributeName: "LobbyId", KeyType: "HASH" },
      ],
      AttributeDefinitions: [
        { AttributeName: "LobbyId", AttributeType: "S" },
      ],
      ProvisionedThroughput: { ReadCapacityUnits: 4, WriteCapacityUnits: 4 },
    },
    {
      TableName: `MurdleGame`,
      KeySchema: [
        { AttributeName: "GameId", KeyType: "HASH" },
      ],
      AttributeDefinitions: [
        { AttributeName: "GameId", AttributeType: "S" },
      ],
      ProvisionedThroughput: { ReadCapacityUnits: 4, WriteCapacityUnits: 4 },
      LocalSecondaryIndexes: [],
    }
  ],
  port: 8000,
};
