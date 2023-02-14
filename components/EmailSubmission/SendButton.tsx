'use client';
import {Button, CircularProgress} from "@mui/material";
import {MSend} from "@icons";

export function SendButton(props: Parameters<typeof Button>[0] & { isLoading?: boolean }) {
	const {isLoading, ...buttonProps} = props

	if (props.isLoading) {
		return (<>
			<CircularProgress className={"text-black dark:text-white"} size={30} />
		</>)
	}

	return <Button {...buttonProps} type="submit" variant="outlined" className={`self-start flex gap-2 
		text-black dark:text-white border-black dark:border-neutral
		border-hover-purple text-hover-purple
	`}>

		<MSend fontSize={'small'} />
		<span>
			Send
		</span>
	</Button>;
}