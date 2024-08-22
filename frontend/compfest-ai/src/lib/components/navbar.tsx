import Link from 'next/link'
import React, { useEffect } from 'react'
import NavLink from '../utility/navlink'
import { VariableHover } from '../utility/variable-hover'
import { TextGlitch } from '../utility/text-glitch'
import AOS from "aos";
import 'aos/dist/aos.css';

const Navbar = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <nav className="flex items-center justify-between p-4 flex-row">
      <div className="text-lg font-medium">
        <NavLink href="/" textToGlitch="FreakyNus" data-aos='fade-right' data-aos-duration='200'></NavLink>
      </div>
      <div className="flex space-x-4 font-normal" data-aos='fade-left' data-aos-duration='300'>
        <TextGlitch textToGlitch={"Home"} hover={true}/>
        <TextGlitch textToGlitch={"About Us"} hover={true}/>
        <TextGlitch textToGlitch={"Skills"} hover={true}/>
      </div>
    </nav>
  )
}

export default Navbar