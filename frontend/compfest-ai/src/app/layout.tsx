"use client"

import { useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";
import { ParallaxProvider } from "react-scroll-parallax";
import "../app/globals.css";
import '@radix-ui/themes/styles.css';
// import "locomotive-scroll/src/locomotive-scroll.scss";
import { AnimatePresence } from "framer-motion";
import { Theme } from '@radix-ui/themes';

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const scrollRef = useRef<HTMLDivElement | null>(null); // Updated type

	useEffect(() => {
		if (scrollRef.current) {
			const locomotiveScroll = new LocomotiveScroll({
				el: scrollRef.current as HTMLElement,
				smooth: true,
				lerp: 0.1,
				multiplier: 1,
				class: "is-reveal",
			});

			// Check if locomotiveScroll is initialized correctly
			console.log("LocomotiveScroll instance:", locomotiveScroll);

			// Update LocomotiveScroll on window resize
			window.addEventListener("resize", () => {
				if (locomotiveScroll.update) {
					locomotiveScroll.update();
				} else {
					console.error("locomotiveScroll.update is not a function");
				}
			});

			// Cleanup LocomotiveScroll instance on component unmount
			return () => {
				if (locomotiveScroll) locomotiveScroll.destroy();
			};
		}
	}, []);


	return (
		<html lang="en" className="box-border">
			<body>
				<div ref={scrollRef}>
					<ParallaxProvider>
						<Theme>
							{children}
						</Theme>
					</ParallaxProvider>
					{/* Your content */}
				</div>
			</body>
		</html>
	);
}
