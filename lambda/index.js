const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });

const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = 'TelemetryData';

exports.handler = async (event) => {
  try {
    const body = typeof event.body === "string" ? JSON.parse(event.body) : event.body;

    const params = {
      TableName: tableName,
      Item: {
        deviceId: 'lambda-001',
        timestamp: Date.now(),
        speed: body.speed,
        battery: body.battery
      }
    };

    await dynamodb.put(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Data logged',
        input: body
      })
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error writing to DynamoDB', error: error.message })
    };
  }
};
