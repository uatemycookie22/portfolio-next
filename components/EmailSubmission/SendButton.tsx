import {Button, CircularProgress} from "@mui/material";
import {MSend} from "@icons";
import { useFormStatus } from "react-dom"


export function SendButton(props: Parameters<typeof Button>[0] & { isLoading?: boolean }) {
	const {isLoading, ...buttonProps} = props
	const { pending } = useFormStatus()

	if (props.isLoading || pending) {
		return (<>
			<CircularProgress className={"text-black dark:text-white"} size={30} />
		</>)
	}

	return <button {...buttonProps} type="submit" className={`self-start flex gap-2 border rounded px-4 py-1
		text-lg items-center
		text-black dark:text-white border-black dark:border-neutral
		border-hover-purple text-hover-purple
	`}>

		<MSend fontSize={'small'} />
		<span>
			Send
		</span>
	</button>;
}