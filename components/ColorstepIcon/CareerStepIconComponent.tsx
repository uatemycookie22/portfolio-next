import {StepIconProps, styled} from "@mui/material";
import {ReactElement} from "react";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";

const ColorlibStepIconRoot = styled('div')<{
	ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
	zIndex: 1,
	color: '#fff',
	width: 50,
	height: 50,
	display: 'flex',
	borderRadius: '50%',
	justifyContent: 'center',
	alignItems: 'center',
	...(ownerState.active && {
		marginTop: 'max(-2vh, -50px)',
		transition: 'all 500ms',
		backgroundImage:
			'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
		boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
	}),
	...(ownerState.completed && {
		marginTop: 'max(-2vh, -50px)',
		transition: 'all 500ms',
		backgroundImage:
			'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
	}),
}));

export default function CareerStepIcon({ active, completed, className, icon }: StepIconProps) {
	const icons: { [index: string]: ReactElement } = {
		1: <SportsEsportsIcon />,
		2: <SchoolIcon />,
		3: <WorkIcon />,
		4: <WorkIcon />,
		5: <WorkIcon />,

	};

	return (
		<ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
			{icons[String(icon)]}
		</ColorlibStepIconRoot>
	);
}