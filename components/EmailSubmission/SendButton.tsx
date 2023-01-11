'use client';
import {Button, CircularProgress} from "@mui/material";
import MSend from "@icons/MSend";

export function SendButton(props: Parameters<typeof Button>[0] & { isLoading?: boolean }) {
	const {isLoading, ...buttonProps} = props

	if (props.isLoading) {
		return (<>
			<CircularProgress color="secondary" size={30} />
		</>)
	}

	return <Button {...buttonProps} type="submit" color="secondary" variant="outlined" className="self-start flex gap-2">

		<MSend fontSize={'small'} />
		<span>
			Send
		</span>
	</Button>;
}