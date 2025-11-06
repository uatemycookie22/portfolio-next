import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

// Create DynamoDB client
const client = new DynamoDBClient({
    region: process.env.AWS_REGION || 'us-east-1',
});

// Create DocumentClient for easier operations (handles marshalling/unmarshalling)
export const docClient = DynamoDBDocumentClient.from(client, {
    marshallOptions: {
        removeUndefinedValues: true, // Remove undefined values
        convertClassInstanceToMap: true, // Convert class instances to maps
    },
    unmarshallOptions: {
        wrapNumbers: false, // Return numbers as native JS numbers
    },
});

// Export table names from environment variables
export const BLOG_POSTS_TABLE = process.env.DYNAMODB_TABLE_NAME || '';

// Export both clients for flexibility
export { client as dynamoDBClient };
export default docClient;