'use client';
import {LinkedIn} from "@mui/icons-material";

export default function MLinkedIn (props: Parameters<typeof LinkedIn>[0]) {
	return (<LinkedIn {...props} style={{transition: 'color 300ms ease', ...props.style}} />)
}