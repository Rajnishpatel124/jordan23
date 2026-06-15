import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, TextPlugin);

  gsap.config({
    autoSleep: 60,
    force3D: false,
    nullTargetWarn: false,
  });
}

export { gsap, ScrollTrigger };
