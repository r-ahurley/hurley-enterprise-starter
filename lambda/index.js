// index.js — AWS SDK v3 compatible (Node.js 20.x)
// hurley-enterprise-telemetry Lambda (CommonJS version)
// Handles POST (log telemetry), GET (read telemetry), and OPTIONS (CORS)

const {
  DynamoDBClient,
  PutItemCommand,
  ScanCommand,
} = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient({ region: "us-east-1" });
const TABLE_NAME = "TelemetryData";


exports.handler = async (event) => {
  console.log("Incoming event:", JSON.stringify(event));

  // Shared CORS headers
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  try {
    // --- 1️⃣ OPTIONS (preflight) ---
    if (event.httpMethod === "OPTIONS") {
      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify({ message: "CORS preflight OK" }),
      };
    }

    // --- 2️⃣ POST (store telemetry) ---
    if (event.httpMethod === "POST") {
      const body = typeof event.body === "string" ? JSON.parse(event.body) : event.body;
      const { speed, battery } = body || {};

      if (typeof speed !== "number" || typeof battery !== "number") {
        return {
          statusCode: 400,
          headers: corsHeaders,
          body: JSON.stringify({ error: "Invalid input" }),
        };
      }

      const timestamp = Date.now();

      const params = {
        TableName: TABLE_NAME,
        Item: {
          deviceId: { S: "default" },
          timestamp: { N: String(timestamp) },
          speed: { N: String(speed) },
          battery: { N: String(battery) },
        },
      };

      await client.send(new PutItemCommand(params));

      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify({
          message: "Data logged",
          input: { speed, battery, timestamp },
        }),
      };
    }

    // --- 3️⃣ GET (retrieve telemetry records) ---
    if (event.httpMethod === "GET") {
      const data = await client.send(new ScanCommand({ TableName: TABLE_NAME }));
      const items = (data.Items || []).map((item) => ({
        deviceId: item.deviceId.S,
        timestamp: Number(item.timestamp.N),
        speed: Number(item.speed.N),
        battery: Number(item.battery.N),
      }));

      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify({ Items: items }),
      };
    }

    // --- 4️⃣ Unsupported methods ---
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: `Method ${event.httpMethod} not allowed` }),
    };
  } catch (err) {
    console.error("Lambda error:", err);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
