// index.js — AWS SDK v3 compatible (Node.js 20.x)

const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");

exports.handler = async (event) => {
  try {
    const body = typeof event.body === "string" ? JSON.parse(event.body) : event.body;
    const { speed, battery } = body;

    const client = new DynamoDBClient({ region: "us-east-1" });

    const params = {
      TableName: "TelemetryData",
      Item: {
        deviceId: { S: "lambda-001" },
        timestamp: { N: Date.now().toString() },
        speed: { N: speed.toString() },
        battery: { N: battery.toString() },
      },
    };

    await client.send(new PutItemCommand(params));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Data logged", input: body }),
    };
  } catch (err) {
    console.error("Error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error processing telemetry",
        error: err.message,
      }),
    };
  }
};

