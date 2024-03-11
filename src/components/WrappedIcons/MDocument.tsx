'use client';
import {Article} from "@mui/icons-material";

export default function MDocument(props: Parameters<typeof Article>[0]) {
    return (<Article {...props} />)
}