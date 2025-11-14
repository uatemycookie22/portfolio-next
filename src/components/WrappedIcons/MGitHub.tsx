'use client';
import {GitHub} from "@mui/icons-material";

export default function MGitHub (props: Parameters<typeof GitHub>[0]) {
	return (<GitHub {...props} style={{transition: 'color 300ms ease', ...props.style}} />)
}