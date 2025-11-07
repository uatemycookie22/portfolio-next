import { CostExplorerClient, GetCostAndUsageCommand } from '@aws-sdk/client-cost-explorer';
import { fromTemporaryCredentials } from '@aws-sdk/credential-providers';

// Configure credentials same as DynamoDB
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const sessionToken = process.env.AWS_SESSION_TOKEN;

const credentials = process.env.AWS_ROLE_ARN
    ? fromTemporaryCredentials({
          params: {
              RoleArn: process.env.AWS_ROLE_ARN,
              RoleSessionName: 'cost-explorer-session',
          },
      })
    : accessKeyId && secretAccessKey
    ? {
          accessKeyId,
          secretAccessKey,
          ...(sessionToken && { sessionToken }),
      }
    : undefined;

const client = new CostExplorerClient({
    region: 'us-east-1', // Cost Explorer is only in us-east-1
    credentials,
});

export interface MonthlyCost {
    month: string;
    amount: string;
    unit: string;
}

/**
 * Get AWS costs for the current month
 */
export async function getCurrentMonthCost(): Promise<MonthlyCost | null> {
    try {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

        // Format dates as YYYY-MM-DD for Cost Explorer
        const start = startOfMonth.toISOString().split('T')[0];
        const end = endOfMonth.toISOString().split('T')[0];

        console.log('[Cost Explorer] Fetching costs for:', { start, end });

        const command = new GetCostAndUsageCommand({
            TimePeriod: {
                Start: start,
                End: end,
            },
            Granularity: 'MONTHLY',
            Metrics: ['UnblendedCost'],
        });

        const response = await client.send(command);
        
        if (!response.ResultsByTime || response.ResultsByTime.length === 0) {
            console.log('[Cost Explorer] No cost data available');
            return null;
        }

        const result = response.ResultsByTime[0];
        const amount = result.Total?.UnblendedCost?.Amount || '0';
        const unit = result.Total?.UnblendedCost?.Unit || 'USD';

        console.log('[Cost Explorer] Current month cost:', {
            month: start,
            amount: `${unit} ${parseFloat(amount).toFixed(2)}`,
            rawAmount: amount,
        });

        return {
            month: start,
            amount,
            unit,
        };
    } catch (error) {
        console.error('[Cost Explorer] Error fetching costs:', error);
        return null;
    }
}