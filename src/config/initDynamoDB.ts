import { CreateTableCommand } from "@aws-sdk/client-dynamodb";
import { docClient } from "../config/dynamodb";
import dotenv from 'dotenv';

dotenv.config();

async function initDynamoDB() {
  try {
    // Create Users table
    const createUsersTableParams = {
      TableName: "Users",
      KeySchema: [
        { AttributeName: "email", KeyType: "HASH" } // Partition key
      ],
      AttributeDefinitions: [
        { AttributeName: "email", AttributeType: "S" }
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
      }
    };

    console.log("Creating Users table...");
    await docClient.send(new CreateTableCommand({
      TableName: "Users",
      KeySchema: [
        { AttributeName: "email", KeyType: "HASH" }
      ],
      AttributeDefinitions: [
        { AttributeName: "email", AttributeType: "S" }
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
      }
    }));
    console.log("✅ Users table created successfully");

    // Add more tables as needed for your application

  } catch (err) {
    if ((err as { name?: string }).name === 'ResourceInUseException') {
      console.log("✅ Tables already exist");
    } else {
      console.error("❌ Error creating tables:", err);
    }
  }
}

initDynamoDB().catch(console.error);