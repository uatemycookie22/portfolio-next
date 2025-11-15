import {invalidPrompt} from "../../utils/api-constants";

export const ErrorMessage = ({errorMessage, recipientEmail}: { errorMessage: string, recipientEmail: string }) => {
    if (!errorMessage) return null

    if (errorMessage == invalidPrompt) {
        return (<>{invalidPrompt}</>)
    }

    return (<>
        {errorMessage}

        &nbsp;If the issue persists, please email me directly at <span>
				<a className="text-gray-900 dark:text-gray-100 underline font-semibold" href={`mailto:${recipientEmail}`}>
					{recipientEmail}
				</a>
			</span>
    </>)
}