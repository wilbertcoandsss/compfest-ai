"use client"

import Link from 'next/link'
import React, { useEffect } from 'react'
import NavLink from '../utility/navlink'
import { VariableHover } from '../utility/variable-hover'
import { TextGlitch } from '../utility/text-glitch'
import AOS from "aos";
import 'aos/dist/aos.css';
import TransitionLink from '../utility/navlink'

const Navbar = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <nav className="flex items-center justify-between p-4 flex-row">
      <div className="text-2xl font-medium">
        <TransitionLink href="/" label="FreakyNus" />
      </div>
      <div className="flex space-x-4 text-1xl font-medium" data-aos='fade-left' data-aos-duration='300'>
        <TransitionLink href="/" label="Home" />
        <TransitionLink href="/skills" label="Skills" />
        {/* <TextGlitch textToGlitch={"Skills"} hover={true} /> */}
      </div>
    </nav>
  )
}

export default Navbar