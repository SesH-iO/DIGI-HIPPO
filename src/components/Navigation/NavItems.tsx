"use client";
import {useEffect, useRef, useState} from "react";

// HOOKS
import {useClickAwayListener} from "@/hooks/useClickAwayListener";

// MOCK DATA
import {PRODUCT_CATEGORIES} from "@/config";

// COMPONENTS
import NavItem from "./NavItem";

const NavItems = () => {
	const [activeIndex, setActiveIndex] = useState<null | number>(null);

	useEffect(() => {
		const handler = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setActiveIndex(null);
			}
		};

		document.addEventListener("keydown", handler);

		return () => {
			document.removeEventListener("keydown", handler);
		};
	}, []);

	const isAnyOpen = activeIndex !== null;

	const navRef = useRef<HTMLDivElement | null>(null);

	useClickAwayListener(navRef, () => setActiveIndex(null));

	return (
		<div className="flex gap-4 h-full" ref={navRef}>
			{PRODUCT_CATEGORIES.map((category, i) => {
				const handleOpen = () => {
					if (activeIndex === i) {
						setActiveIndex(null);
					} else {
						setActiveIndex(i);
					}
				};

				const isOpen = i === activeIndex;

				return (
					<NavItem
						key={category.value}
						category={category}
						isOpen={isOpen}
						handleOpen={handleOpen}
						isAnyOpen={isAnyOpen}
					/>
				);
			})}
		</div>
	);
};

export default NavItems;
