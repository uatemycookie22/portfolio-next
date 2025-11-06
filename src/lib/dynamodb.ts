import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { fromTemporaryCredentials } from "@aws-sdk/credential-providers";

// Configure credentials based on environment
// - In Lightsail: Use explicit role assumption (AWS_ROLE_ARN set)
// - In GitHub Actions/Local: Use default credential chain (env vars or ~/.aws/credentials)
const credentials = process.env.AWS_ROLE_ARN
    ? fromTemporaryCredentials({
          params: {
              RoleArn: process.env.AWS_ROLE_ARN,
              RoleSessionName: 'blog-dynamodb-session',
          },
      })
    : undefined; // undefined = use default chain (AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, etc.)

console.log('Created DDB client', {
    hasRoleArn: !!process.env.AWS_ROLE_ARN,
    hasAccessKey: !!process.env.AWS_ACCESS_KEY_ID,
    region: process.env.AWS_REGION,
    tableName: process.env.DYNAMODB_TABLE_NAME
});

// Create DynamoDB client
const client = new DynamoDBClient({
    region: process.env.AWS_REGION || 'us-east-1',
    credentials,
});

console.log(`Created DDB client ${client.config}`)

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