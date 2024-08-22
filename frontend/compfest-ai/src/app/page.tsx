"use client"

import Navbar from "@lib/components/navbar";
import { TextGlitch } from "lib/utility/text-glitch";
import { VariableHover } from "lib/utility/variable-hover";
import { Parallax, useParallax } from "react-scroll-parallax";
import AOS from "aos";
import 'aos/dist/aos.css';
import { useEffect } from "react";
import { CiFacebook, CiLinkedin, CiTwitter } from "react-icons/ci";
import { FiFigma, FiFacebook } from "react-icons/fi";
import { RiAmazonFill } from "react-icons/ri";
import { FaMeta } from "react-icons/fa6";
import googleImg from "@lib/assets/images/gugel.png";
import amazonImg from "@lib/assets/images/amazon.png";
import facebookImg from "@lib/assets/images/facebook.png";
import figmaImg from "@lib/assets/images/figma.png";
import msImg from "@lib/assets/images/ms.png";
import twitterImg from "@lib/assets/images/twitter.png";
// import {ParallaxLayer} from '@react-spring'
import Image from "next/image";


export default function Home() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const parallax = useParallax<HTMLDivElement>({
    scale: [0.6, 1.5, 'easeInQuad'],
  });


  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center text-center font-restart flex-col h-screen">
        <Parallax speed={-75}>
          <Parallax speed={25}>
          <div className="font-medium text-6xl relative" data-aos='fade-up' data-aos-duration='1300'>
            Search, Apply, & Get <TextGlitch textToGlitch="Your Dream Job! " hover={false}></TextGlitch>
          </div>

          </Parallax>
          <div ref={parallax.ref}>
            <>
              <Image
                src={googleImg}
                alt="Google Logo"
                width={75}  // Specify the width of the image
                height={75} // Specify the height of the image
                className="absolute"
                style={{ bottom: '35px', left: '-130px' }} data-aos='zoom-in-right' data-aos-duration='900'
              />
              <Image
                src={amazonImg}
                alt="Google Logo"
                width={85}  // Specify the width of the image
                height={85}
                className="absolute"
                style={{ bottom: '215px', left: '15px' }} data-aos='zoom-in-left' data-aos-duration='900'
              />
              <Image
                src={facebookImg}
                alt="Google Logo"
                width={95}  // Specify the width of the image
                height={95} // Specify the height of the image
                className="absolute"
                style={{ bottom: '340px', left: '190px' }} data-aos='zoom-in-up' data-aos-duration='900'
              />
              <Image
                src={figmaImg}
                alt="Google Logo"
                width={75}  // Specify the width of the image
                height={75} // Specify the height of the image
                className="absolute"
                style={{ bottom: '350px', left: '450px' }} data-aos='zoom-in-left' data-aos-duration='900'
              />
              <Image
                src={msImg}
                alt="Google Logo"
                width={65}  // Specify the width of the image
                height={65} // Specify the height of the image
                className="absolute"
                style={{ bottom: '225px', right: '25px' }} data-aos='zoom-in-left' data-aos-duration='900'
              />
              <Image
                src={twitterImg}
                alt="Google Logo"
                width={100}  // Specify the width of the image
                height={100} // Specify the height of the image
                className="absolute"
                style={{ bottom: '18px', left: '730px' }} data-aos='zoom-in-right' data-aos-duration='900'
              />
            </>
          </div>
          <br></br>
          <Parallax
            speed={-30}>
            <div className="text-3xl my-10" data-aos='fade-up' data-aos-duration='1400'>
              Start your hunt for the best, life is more than you can do!
            </div>
          </Parallax>
        </Parallax>
        {/* </Parallax> */}
        {/* <div className="w-screen h-screen absolute top-[150vw] bg-red-50">
          NGENTOT
        </div> */}
      </div >

      {/* <Parallax speed={-10}>
        <div className="flex items-center justify-center h-screen text-center font-restart font-medium text-4xl">
          Search, Apply & <br /> Get Your Dream Job !
        </div>
      </Parallax>
      <Parallax speed={-10}>
        <div className="flex items-center justify-center h-screen text-center font-restart font-medium text-4xl">
          Search, Apply & <br /> Get Your Dream Job !
        </div>
      </Parallax>
      <Parallax speed={-10}>
        <div className="flex items-center justify-center h-screen text-center font-restart font-medium text-4xl">
          Search, Apply & <br /> Get Your Dream Job !
        </div>
      </Parallax> */}
      <br></br >
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </>
  );
}
