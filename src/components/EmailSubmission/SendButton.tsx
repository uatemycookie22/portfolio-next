import {Send} from "lucide-react";
import { useFormStatus } from "react-dom"

function CircularProgress({ size = 30 }: { size?: number }) {
	return (
		<svg className="animate-spin text-violet-600 dark:text-violet-400" width={size} height={size} viewBox="0 0 24 24" fill="none">
			<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
			<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
		</svg>
	)
}

export function SendButton(props: React.ButtonHTMLAttributes<HTMLButtonElement> & { isLoading?: boolean }) {
	const {isLoading, ...buttonProps} = props
	const { pending } = useFormStatus()

	if (props.isLoading || pending) {
		return <CircularProgress size={30} />
	}

	return <button {...buttonProps} type="submit" className={`self-start flex gap-2 border rounded px-4 py-1
		text-lg items-center transition-all duration-300 cursor-pointer
		text-black dark:text-white border-black dark:border-white
		border-hover-purple text-hover-purple
	`}>
		<Send size={18} />
		<span>Send</span>
	</button>;
}