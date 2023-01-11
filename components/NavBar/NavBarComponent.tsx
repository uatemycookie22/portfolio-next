'use client';

import {AnchorHTMLAttributes, DetailedHTMLProps, useEffect, useMemo, useRef, useState} from "react";
import {formatPhoneNumber} from "@utils/formatters";

function NavBarButton(anchorProps:
	DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>) {

	const {className:_, ...rest} = anchorProps

	return (
		<a {...rest}
		   className={`block mt-4 lg:inline-block lg:mt-0 mr-4
			  btn bg-none text-primary font-semibold py-2 px-6 rounded-full
			  focus:outline-none hover:bg-secondary hover:bg-opacity-5 duration-300`} />
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

		<div className={`fixed w-full z-50 top-0 bg-primary lg:flex lg:justify-between lg:items-center lg:px-4 px-6 py-3  text-primary
		transition duration-300
		${scrollDirection ? 'top-0' : 'translate-y-[-100%] sm:translate-y-0'}
		`}>
			<div className="flex justify-between items-center ml-5">
				<a href="/" className="text-2xl font-semibold tracking-tight">LH</a>

				<div className="relative z-10 lg:hidden">
					<button
						aria-label="hamburger menu to open navigation drawer"
						className={`block rounded-md text-nav flex flex-col justify-between cursor-pointer
					 ${tw.barW} h-[22px] 
					`}
						onClick={toggleMenu}
					>
					<span className={`h-[3px] bg-secondary origin-left transition-transform ease-in-out transition ease-in-out
					${ isMenuOpen ? tw.rotatedW : 'w-full'}
					${ isMenuOpen ? 'rotate-[45deg]' : ''}
					`} />

						<span className={`h-[3px] bg-secondary transition-opacity ease-linear
					${ isMenuOpen ? tw.rotatedW : 'w-full'}
					${ isMenuOpen ? 'opacity-0' : ''}
					`} />

						<span className={`h-[3px] bg-secondary origin-left transition-transform ease-in-out transition ease-out
					${ isMenuOpen ? tw.rotatedW : 'w-full'}
					${ isMenuOpen ? 'rotate-[-45deg]' : ''}`} />
					</button>
				</div>
			</div>

			<div className={`${isMenuOpen ? 'block' : 'hidden'} lg:block lg:flex lg:items-center w-full lg:w-auto`}>
				<div className="text-sm lg:flex-grow">

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

				</div>
				<div className="text-sm">

						<NavBarButton href={`mailto:${email}`}>
							<span className="text-gray-300 transition duration-300 group-hover:text-primary">
								{email}
							</span>
						</NavBarButton>

						<NavBarButton href={`tel:${phone}`}>
							<div className="w-full h-full">
								<span className="text-gray-300 transition duration-300 group-hover:text-primary">
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