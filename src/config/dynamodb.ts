import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import dotenv from 'dotenv';

dotenv.config();

// Initialize the DynamoDB client
const client = new DynamoDBClient({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  }
});

// Create a document client for easier interaction with DynamoDB
export const docClient = DynamoDBDocumentClient.from(client);

export async function connectToDynamoDB() {
  try {
    // Test the connection by making a simple API call
    await client.config.credentials();
    console.log("✅ Connected to DynamoDB");
    return docClient;
  } catch (err) {
    console.error("❌ DynamoDB connection failed:", err);
    process.exit(1);
  }
}