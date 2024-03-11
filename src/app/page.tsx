import IntroComponent from "@components/Intro/IntroComponent";
import EducationComponents from "@components/Education/EducationComponent";
import Experience from "@components/Experience/Experience";
import Contact from "@components/Contact/Contact";
import {Metadata, Viewport} from "next";
import contentjson from "public/content.json"

export const metadata: Metadata = {
	title: 'Lysander H',
	description: 'The personal page of Lysander Hernandez, an aspiring software developer.' +
		' Interests are in fullstack web development and machine learning.',
	icons: [
		{rel: 'shortcut icon', url: '/favicon.ico'}
	],
};

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
}

export default async function HomePage() {
	const content = contentjson

	return (
		<>
			<IntroComponent {...content.intro} />
			<EducationComponents {...content.education} />
			<Experience {...content.experience} />
			{/*// @ts-ignore*/}
			<Contact />
		</>

	)
}