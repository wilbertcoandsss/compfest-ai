"use client"

import { usePathname } from 'next/navigation';
import React from 'react';
import { TextGlitch } from './text-glitch';

interface NavLinkProps {
  href: string;
  textToGlitch: string;
  activeClassName?: string;
  inactiveClassName?: string;
}

const NavLink: React.FC<NavLinkProps> = ({
  href,
  textToGlitch,
  activeClassName = 'font-bold underline p-5',
  inactiveClassName = 'hover:underline',
}) => {
  const router = usePathname();
  const isActive = router === href;
  return (
    <div className='font-restart'>
      <a href={href} className={isActive ? activeClassName : inactiveClassName}>
        <TextGlitch textToGlitch={textToGlitch} hover={true}/>
      </a>
    </div>
  );
};

export default NavLink;
