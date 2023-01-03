'use client';

import {ReactNode, useEffect, useMemo, useRef, useState} from "react";
import {formatPhoneNumber} from "@utils/formatters";
import Link from "next/link";
import {UrlObject} from "url";

function NavBarButton({href, children}: {children: ReactNode, href: string | UrlObject}) {
	return (
		<Link href={href} scroll={false} className="block mt-4 lg:inline-block lg:mt-0 mr-6">
		<button className="transparent py-2 px-4 rounded-full focus:outline-none hover:bg-secondary hover:bg-opacity-5 duration-300 group">
			{children}
		</button>
		</Link>
	)
}

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

	return (
		<>

		<div className={`fixed w-full z-50 top-0 bg-nav lg:flex lg:justify-between lg:items-center lg:px-4 px-6 py-3  text-nav
		transition duration-300
		${scrollDirection ? 'top-0' : 'translate-y-[-100%] sm:translate-y-0'}
		`}>
			<div className="flex justify-between items-center">
				<a href="/" className="text-2xl font-semibold tracking-tight">LH</a>

				<div className="relative z-10 lg:hidden">
					<button
						className={`block rounded-md text-nav flex flex-col justify-between cursor-pointer
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

			<div className={`${isMenuOpen ? 'block' : 'hidden'} lg:block lg:flex lg:items-center w-full lg:w-auto`}>
				<div className="text-sm lg:flex-grow">

						<NavBarButton href='/#home'>
							Home
						</NavBarButton>

						<NavBarButton href='/#about'>
							About
						</NavBarButton>

						<NavBarButton href='/#education'>
							Education
						</NavBarButton>

						<NavBarButton href='/#experience'>
							Experience
						</NavBarButton>

						<NavBarButton href='/#projects'>
							Projects
						</NavBarButton>

				</div>
				<div className="text-sm">

						<NavBarButton href={`mailto:${email}`}>
							<span className="text-gray-600 transition duration-300 group-hover:text-nav">
								{email}
							</span>
						</NavBarButton>

						<NavBarButton href={`tel:${phone}`}>
							<div className="w-full h-full">
								<span className="text-gray-600 transition duration-300 group-hover:text-nav">
									{phoneFormatted}
								</span>
							</div>
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