import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { fromTemporaryCredentials } from "@aws-sdk/credential-providers";

// Configure credentials based on environment
// - In Lightsail: Use explicit role assumption (AWS_ROLE_ARN set)
// - In Docker build: Use explicit env credentials (AWS_ACCESS_KEY_ID set)
// - In local dev: Use default credential chain (profile)
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const sessionToken = process.env.AWS_SESSION_TOKEN;

const credentials = process.env.AWS_ROLE_ARN
    ? fromTemporaryCredentials({
          params: {
              RoleArn: process.env.AWS_ROLE_ARN,
              RoleSessionName: 'blog-dynamodb-session',
          },
      })
    : accessKeyId && secretAccessKey
    ? {
          accessKeyId,
          secretAccessKey,
          ...(sessionToken && { sessionToken }), // Include session token if present (OIDC/temporary creds)
      }
    : undefined; // undefined = use default chain (profile, instance profile, etc.)

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