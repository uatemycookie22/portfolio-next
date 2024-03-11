'use client';
import {Place} from "@mui/icons-material";

export default function MLocation(props: Parameters<typeof Place>[0]) {
    return (<Place {...props} />)
}