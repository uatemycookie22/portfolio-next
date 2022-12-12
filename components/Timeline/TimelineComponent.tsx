'use client';

import {useState} from "react";

interface TimelineItemProps extends TimelineItem {
	active: boolean
}

function  TimelineItemComponent({text, active}: TimelineItemProps) {
	return (<>
		<div>{text}</div>
	</>)
}

interface TimelineProps {
	timelineItems: TimelineItem[]
}

interface TimelineItem {
	text: string
}

export function TimelineComponent({timelineItems}: TimelineProps) {
	const [items, setItems] = useState(timelineItems.map<TimelineItemProps>(item => ({...item, active: false})))
	const timelineComponents = items.map(item => TimelineItemComponent(item))

	return (<>
		{timelineComponents}
	</>)
}