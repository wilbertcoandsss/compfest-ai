"use client"

import Navbar from "@lib/components/navbar";
import { TextGlitch } from "lib/utility/text-glitch";
import { VariableHover } from "lib/utility/variable-hover";
import { Parallax, ParallaxBanner, useParallax } from "react-scroll-parallax";
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
import Link from "next/link";
import TransitionLink from "@lib/utility/navlink";


export default function Home() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const parallax = useParallax<HTMLDivElement>({
    scale: [0.6, 1.5, 'easeInQuad'],
    opacity: [0.4, 1]
  });

  const parallax2 = useParallax<HTMLDivElement>({
    scale: [0.4, 1.3, 'easeInQuad'],
    rotate: [360, -180],
    opacity: [-1.5, 1]
  })

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center text-center font-restart flex-col h-screen w-full" >
        <div>
          <Parallax speed={-75}>
            <Parallax speed={25}>
              <div className="font-medium text-6xl relative" data-aos='fade-up' data-aos-duration='1300'>
                Search, Apply, & Get <TextGlitch textToGlitch="Your Dream Job! " hover={true}></TextGlitch>
              </div>
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
            </Parallax>
            <Parallax speed={52}>
              <div ref={parallax2.ref} className="relative">
                <>
                  <Image
                    src={googleImg}
                    alt="Google Logo"
                    width={75}  // Specify the width of the image
                    height={75} // Specify the height of the image
                    className="absolute"
                    style={{ bottom: '35px', left: '-130px', rotate: '180deg'}} data-aos='zoom-in-right' data-aos-duration='900'
                  />
                  <Image
                    src={amazonImg}
                    alt="Google Logo"
                    width={85}  // Specify the width of the image
                    height={85}
                    className="absolute"
                    style={{ bottom: '215px', left: '15px',  rotate: '180deg' }} data-aos='zoom-in-left' data-aos-duration='900'
                  />
                  <Image
                    src={facebookImg}
                    alt="Google Logo"
                    width={95}  // Specify the width of the image
                    height={95} // Specify the height of the image
                    className="absolute"
                    style={{ bottom: '340px', left: '190px',  rotate: '180deg' }} data-aos='zoom-in-up' data-aos-duration='900'
                  />
                  <Image
                    src={figmaImg}
                    alt="Google Logo"
                    width={75}  // Specify the width of the image
                    height={75} // Specify the height of the image
                    className="absolute"
                    style={{ bottom: '350px', left: '450px',  rotate: '180deg' }} data-aos='zoom-in-left' data-aos-duration='900'
                  />
                  <Image
                    src={msImg}
                    alt="Google Logo"
                    width={65}  // Specify the width of the image
                    height={65} // Specify the height of the image
                    className="absolute"
                    style={{ bottom: '225px', right: '25px',  rotate: '180deg' }} data-aos='zoom-in-left' data-aos-duration='900'
                  />
                  <Image
                    src={twitterImg}
                    alt="Google Logo"
                    width={100}  // Specify the width of the image
                    height={100} // Specify the height of the image
                    className="absolute"
                    style={{ bottom: '18px', left: '730px',  rotate: '180deg' }} data-aos='zoom-in-right' data-aos-duration='900'
                  />
                </>
              </div>
            </Parallax>
            <br></br>
            <br></br>
            <Parallax
              speed={-30}>
              <div className="text-3xl my-10 font-medium" data-aos='fade-up' data-aos-duration='1400'>
                Start your hunt for the best, life is more than you can do!
              </div>
            </Parallax>
          </Parallax>
        </div>
        <div>
          <Parallax
            speed={-35}>
            <div className="text-3xl my-10 font-medium text-transparent" data-aos='fade-up' data-aos-duration='1400'>
              Ready to start your journey ?
              <br></br>
              Click here!
            </div>
          </Parallax>
          <Parallax
            speed={-30}>
            <div className="text-3xl font-medium h-screen absolute top-[100vh]" data-aos='fade-up' data-aos-duration='1400'>
            <TextGlitch textToGlitch="Ready to start your journey ? "hover={false}></TextGlitch>
            <br></br>
            <TransitionLink href="/skills" label="Click here!"/>
            </div>
            <br></br>
          </Parallax>
        </div>
      </div >
    </>
  );
}
