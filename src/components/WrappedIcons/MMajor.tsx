'use client';
import {Devices} from "@mui/icons-material";

export default function MMajor(props: Parameters<typeof Devices>[0]) {
    return (<Devices {...props} />)
}