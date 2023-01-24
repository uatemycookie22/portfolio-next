'use client';

import {useEffect, useMemo, useRef, useState} from "react";
import {formatPhoneNumber} from "@utils/formatters";
import {useAtom} from "jotai";
import {darkModeAtom} from "@atoms/dark-mode";
import NavBarButton from "@components/NavBar/NavBarButton";
import ToggleDarkmodeButton from "@components/NavBar/DarkModeToggle";

type NavbarProps = {
	contact: Contact
}

export default function NavBarComponent(props: NavbarProps) {
	const { phone, email } = props.contact
	const [isMenuOpen, setMenuOpen] = useState(false)
	const scrollDirection = useScrollDirection()

	const phoneFormatted = useMemo(() => formatPhoneNumber(phone), [phone])

	const toggleMenu = () => {
		setMenuOpen(!isMenuOpen);
	}

	const {current: tw} = useRef({
		barW: 'w-[28px]',
		rotatedW: 'w-[28px]',
	})

	const [darkMode, setDarkmode] = useAtom(darkModeAtom)

	return (
		<>

		<div className={`fixed w-full z-50 top-0 
		backdrop-filter backdrop-blur lg:flex lg:justify-between lg:items-center lg:px-4 px-6 py-3   
		transition-duration-300
		text-black bg-zinc-200/40
		dark:text-white dark:bg-zinc-900/75
		${scrollDirection ? 'top-0' : 'translate-y-[-100%] sm:translate-y-0'}
		`}>
			<div className="flex justify-between items-center ml-5">
				<a href="/" className={`text-2xl font-semibold tracking-tight font-medium rounded-md w-fit
				text-hover-purple
				transition-duration-300
				dark:text-white
				`}>
					LH
				</a>

				<div className="relative z-10 lg:hidden">
					<button
						aria-label="hamburger menu to open navigation drawer"
						className={`block rounded-md text-nav flex flex-col justify-between cursor-pointer
					 ${tw.barW} h-[22px] 
					`}
						onClick={toggleMenu}
					>
					<span className={`h-[3px] bg-black dark:bg-white origin-left transition-transform ease-in-out transition ease-in-out
					${ isMenuOpen ? tw.rotatedW : 'w-full'}
					${ isMenuOpen ? 'rotate-[45deg]' : ''}
					`} />

						<span className={`h-[3px] bg-black dark:bg-white transition-opacity ease-linear
					${ isMenuOpen ? tw.rotatedW : 'w-full'}
					${ isMenuOpen ? 'opacity-0' : ''}
					`} />

						<span className={`h-[3px] bg-black dark:bg-white origin-left transition-transform ease-in-out transition ease-out
					${ isMenuOpen ? tw.rotatedW : 'w-full'}
					${ isMenuOpen ? 'rotate-[-45deg]' : ''}`} />
					</button>
				</div>
			</div>

			<div className={`${isMenuOpen ? 'block' : 'hidden'} lg:block lg:items-center w-full lg:w-auto mt-4 lg:mt-0`}>
				<div className="text-sm lg:flex-grow flex flex-col lg:flex-row gap-4">
						<ToggleDarkmodeButton onClick={() => setDarkmode(!darkMode)} />

						<NavBarButton href='/#top' onClick={toggleMenu}>
							Home
						</NavBarButton>

						{/*<NavBarButton href='/#about'>*/}
						{/*	About*/}
						{/*</NavBarButton>*/}

						<NavBarButton href='/#education' onClick={toggleMenu}>
							Education
						</NavBarButton>

						<NavBarButton href='/#experience' onClick={toggleMenu}>
							Experience
						</NavBarButton>

					<NavBarButton href='/#contact' onClick={toggleMenu}>
						Contact
					</NavBarButton>

						{/*<NavBarButton href='/#projects'>*/}
						{/*	Projects*/}
						{/*</NavBarButton>*/}

					<NavBarButton href={`mailto:${email}`}>
						{email}
					</NavBarButton>

					<NavBarButton href={`tel:${phone}`}>
						{phoneFormatted}
					</NavBarButton>
				</div>
			</div>
		</div>

			<div className="w-full h-[56px]" />
		</>
	)
}

function useScrollDirection() {
	const [direction, setDirection] = useState(true)
	const [lastScrollTop, setLastScrollTop] = useState(0);

	const handleScroll = () => {
		const currentScrollPos = window.scrollY

		if(currentScrollPos > lastScrollTop){
			setDirection(false)
		}else{
			setDirection(true)
		}

		setLastScrollTop(currentScrollPos)
	}

	useEffect( () => {
		window.addEventListener('scroll', handleScroll);

		return () => window.removeEventListener('scroll', handleScroll)
	})

	return direction
}