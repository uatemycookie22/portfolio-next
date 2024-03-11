import {JobBullet} from "../JobBullet/JobBullet";

interface JobBackContentProps {
	items?: string[];
}

export default function JobBackContent(props: JobBackContentProps) {
	const bullets = props.items?.map((text, i) => (
		<JobBullet key={i}>
			{text}
		</JobBullet>))

	return <>
		<ul className="h-full w-full pb-4">
			{bullets}
		</ul>
	</>;
}