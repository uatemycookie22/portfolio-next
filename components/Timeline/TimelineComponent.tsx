'use client';

import {ReactElement, useContext, useEffect, useState} from "react";
import {
	Box,
	Step,
	StepConnector, stepConnectorClasses,
	StepContent,
	StepIconProps,
	StepLabel,
	Stepper,
	styled,
	Typography
} from "@mui/material";
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import styles from './TimelineComponent.module.scss';
import {IntersectionRefsContext} from "../../context/intersection-refs";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
	[`&.${stepConnectorClasses.active}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			width: 10,
			marginLeft: 7,
			marginTop: -20,
			height: '32vh',
			backgroundImage:
				'linear-gradient( 85deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
		},
	},
	[`&.${stepConnectorClasses.completed}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			width: 10,
			marginLeft: 7,
			marginTop: -20,
			height: '32vh',
			backgroundImage:
				'linear-gradient( 85deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
		},
	},
	[`& .${stepConnectorClasses.line}`]: {
		marginLeft: 9,

		width: 5,
		height: '28vh',
		maxHeight: '1000px',
		backgroundColor:
			theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#ffffff',

		borderRadius: 7,
	},
}));

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
		backgroundImage:
			'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
		boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
	}),
	...(ownerState.completed && {
		marginTop: 'max(-2vh, -50px)',
		backgroundImage:
			'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
	}),
}));

function CareerStepIcon({ active, completed, className, icon }: StepIconProps) {
	const icons: { [index: string]: ReactElement } = {
		1: <SportsEsportsIcon />,
		2: <SchoolIcon />,
		3: <WorkIcon />,
	};

	return (
		<ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
			{icons[String(icon)]}
		</ColorlibStepIconRoot>
	);
}

interface TimelineItemProps extends TimelineItem {
	active: boolean
}

function  TimelineItemComponent({text, active}: TimelineItemProps) {
	return (<>
		<Typography color="text.primary">{text}</Typography>
	</>)
}

interface TimelineProps {
	timelineItems: TimelineItem[]
}

interface TimelineItem {
	text: string,
	label: string,
}

export function TimelineComponent({timelineItems}: TimelineProps) {
	const [activeStepIndex, setActiveStepIndex] = useState(0)
	const [items, setItems] = useState(timelineItems.map<TimelineItemProps>(item => ({...item, active: false})))

	const intersectingRefs = useContext(IntersectionRefsContext)

	const timelineComponents = items.map((item, i) => (
		<Step key={item.label}>

		<StepLabel StepIconComponent={CareerStepIcon}>
			{item.label}
		</StepLabel>

		<StepContent>
			<TimelineItemComponent key={i} {...item}/>
		</StepContent>

		</Step>
	))

	useEffect(() => {
		const activeStep = 2 - Math.max(intersectingRefs.refs.reverse().findIndex(ref => ref), 0)
		console.log(activeStep)
		console.log(intersectingRefs)
		setActiveStepIndex(activeStep)
	}, [setActiveStepIndex, intersectingRefs])

	return (<>
		<Box color="secondary" sx={{ maxWidth: 200, maxHeight: 1500, position: 'absolute' }}>

		<Stepper orientation="vertical" activeStep={activeStepIndex} className={styles.Stepper} connector={<ColorlibConnector/>}>
			{timelineComponents}
		</Stepper>

		</Box>
	</>)
}