import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

class GsapProvider {
    gsap;
    constructor() {
        gsap.registerPlugin(ScrollTrigger);
        this.gsap = gsap;
    }
}

export const gsapProvider = new GsapProvider();