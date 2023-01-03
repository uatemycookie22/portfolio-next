'use client';

import styles from "./NavBarComponent.module.scss"
import {ReactNode, useMemo, useRef, useState} from "react";
import {formatPhoneNumber} from "@utils/formatters";
import {Button} from "@mui/material";

function NavBarButton({children}: {children: ReactNode}) {
	return (
		<Button variant="text" className={styles.linkButton} color="secondary">
			{children}
	</Button>
	)
}

type NavbarProps = {
	contact: Contact
}

export default function NavBarComponent(props: NavbarProps) {
	const { phone, email } = props.contact
	const [isMenuOpen, setMenuOpen] = useState(false)

	const phoneFormatted = useMemo(() => formatPhoneNumber(phone), [phone])

	const toggleMenu = () => {
		setMenuOpen(!isMenuOpen);
	}

	const {current: tw} = useRef({
		barW: 'w-[28px]',
		rotatedW: 'w-[28px]',
	})

	return (
		<div className="md:flex md:justify-between md:items-center lg:px-4 px-6 py-3 bg-gray-800 text-white">
			<div className="flex justify-between items-center">
				<a href="#" className="text-xl font-semibold tracking-tight">My Website</a>

				<div className="relative z-10 md:hidden">
					<button
						className={`block rounded-md text-gray-500 hover:text-white focus:text-white flex flex-col justify-between cursor-pointer
					 ${tw.barW} h-[22px] 
					`}
						onClick={toggleMenu}
					>
					<span className={`h-[3px] bg-white origin-left transition-transform ease-in-out transition ease-in-out
					${ isMenuOpen ? tw.rotatedW : 'w-full'}
					${ isMenuOpen ? 'rotate-[45deg]' : ''}
					`} />

						<span className={`h-[3px] bg-white transition-opacity ease-linear
					${ isMenuOpen ? tw.rotatedW : 'w-full'}
					${ isMenuOpen ? 'opacity-0' : ''}
					`} />

						<span className={`h-[3px] bg-white origin-left transition-transform ease-in-out transition ease-out
					${ isMenuOpen ? tw.rotatedW : 'w-full'}
					${ isMenuOpen ? 'rotate-[-45deg]' : ''}`} />
					</button>
				</div>
			</div>



			<div className={`${isMenuOpen ? 'block' : 'hidden'} md:block md:flex md:items-center w-full md:w-auto`}>
				<div className="text-sm md:flex-grow">
					<a href="#" className="block mt-4 md:inline-block md:mt-0 mr-6">Home</a>
					<a href="#" className="block mt-4 md:inline-block md:mt-0 mr-6">About</a>
					<a href="#" className="block mt-4 md:inline-block md:mt-0 mr-6">Contact</a>
				</div>
				<div className="text-sm">
					<a href="#" className="inline-block text-slate-400 hover:text-slate-50 mr-4">{email}</a>
					<a href="#" className="inline-block text-slate-400 hover:text-slate-50">{phoneFormatted}</a>
				</div>
			</div>
		</div>
	)
}