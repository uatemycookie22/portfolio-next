import {DarkMode} from "@mui/icons-material";

export default function MDay(props: Parameters<typeof DarkMode>[0]) {
	return (<DarkMode {...props} />)
}