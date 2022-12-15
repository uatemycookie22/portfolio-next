'use client';

import {useContext, useEffect, useState} from "react";
import {
	Box,
	Step,
	StepContent,
	StepLabel,
	Stepper,
	Typography
} from "@mui/material";
import styles from './TimelineComponent.module.scss';
import ColorlibConnector from "../ColorlibConnector/ColorlibConnectorComponent";
import CareerStepIcon from "../ColorstepIcon/CareerStepIconComponent";
import {IntersectionRefsContext} from "../../context/intersection-refs";


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
	const intersectingRefs = useContext(IntersectionRefsContext)

	const items = timelineItems.map<TimelineItemProps>(item => ({...item, active: false}))

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
		const index = [...intersectingRefs.refs].reverse().findIndex(ref => ref)
		const activeStep = Math.max(timelineItems.length - index - 1, 0)

		if (index > -1) {
			setActiveStepIndex(activeStep)
		}
	}, [setActiveStepIndex, intersectingRefs, timelineItems])

	return (<>
		<Box color="secondary" sx={{ maxWidth: 200, maxHeight: 1500, position: 'absolute' }}>

		<Stepper orientation="vertical" activeStep={activeStepIndex} className={styles.Stepper} connector={<ColorlibConnector/>}>
			{timelineComponents}
		</Stepper>

		</Box>
	</>)
}