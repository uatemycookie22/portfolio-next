import {Button} from "@mui/material";

export function SendButton(props: Parameters<typeof Button>[0] & { isLoading?: boolean }) {
	const {isLoading, ...buttonProps} = props

	if (props.isLoading) {
		return (<>
			<Button {...buttonProps} type="submit" color="secondary" variant="outlined" style={{alignSelf: "flex-start"}}>
				Loading
			</Button>
		</>)
	}

	return <Button {...buttonProps} type="submit" color="secondary" variant="outlined" style={{alignSelf: "flex-start"}}>
		Send
	</Button>;
}