'use server';

import {SESClient, SendEmailCommand} from "@aws-sdk/client-ses";
import {revalidateTag} from "next/cache";
import {fromTemporaryCredentials} from "@aws-sdk/credential-providers";

// Configure credentials for Lightsail (requires explicit role assumption)
const credentials = process.env.AWS_ROLE_ARN
    ? fromTemporaryCredentials({
          params: {
              RoleArn: process.env.AWS_ROLE_ARN,
              RoleSessionName: 'blog-ses-session',
          },
      })
    : undefined; // Use default credential chain for local development

// Initialize SES client
const sesClient = new SESClient({
    region: process.env.AWS_REGION || 'us-east-1',
    credentials,
});

type EmailState = {response?: string, error?: string} | null

export async function sendEmailToOwner(
    prevState: EmailState,
    formData: FormData
): Promise<{response?: string, error?: string}> {
    const sourceEmail = "noreply@lysanderh.com"
    const recipientEmail = "hernandezlysander22+lysanderh-contact@gmail.com"
    const senderEmail = formData.get('email') as string
    const message = formData.get('body') as string

    let errorReason = ''

    console.log({ senderEmail, message })

    try {
        const subject = `New contact submission from ${senderEmail}`
        const htmlBody = `
            <html>
                <body>
                    <h2>New Contact Form Submission</h2>
                    <p><strong>From:</strong> ${senderEmail}</p>
                    <p><strong>Message:</strong></p>
                    <p>${message}</p>
                </body>
            </html>
        `

        const command = new SendEmailCommand({
            Source: sourceEmail, // Must be verified in SES
            Destination: {
                ToAddresses: [recipientEmail],
            },
            Message: {
                Subject: {
                    Data: subject,
                    Charset: 'UTF-8',
                },
                Body: {
                    Html: {
                        Data: htmlBody,
                        Charset: 'UTF-8',
                    },
                    Text: {
                        Data: `From: ${senderEmail}\n\nMessage:\n${message}`,
                        Charset: 'UTF-8',
                    },
                },
            },
            ReplyToAddresses: [senderEmail],
        });

        const result = await sesClient.send(command);
        console.log('SES Email sent successfully:', result.MessageId);
        
        await revalidateTag('sendEmail', {})

        return {response: 'Success', error: undefined}
    } catch (err) {
        console.error('SES Error:', err);
        
        if (err instanceof Error) {
            // Log the full error for debugging
            console.error('Error name:', err.name);
            console.error('Error message:', err.message);
            
            // Check for specific SES errors
            if (err.name === 'MessageRejected') {
                errorReason = 'The owner of this site has not set up their inbox correctly.'
            } else if (err.name === 'MailFromDomainNotVerifiedException') {
                errorReason = 'The owner of this site has not set up their inbox correctly.'
            } else {
                errorReason = `Send email failed: ${err.message}`
            }
        } else {
            errorReason = 'Send email failed with unknown error'
        }

        return {response: undefined, error: errorReason}
    }
}

