'use client';
import {AccountBox} from "@mui/icons-material";

export default function MPerson(props: Parameters<typeof AccountBox>[0]) {
    return (<AccountBox {...props} />)
}