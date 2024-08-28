import { gsapProvider } from "./gsap";

export function textParallaxScroll({
  select,
  trigger,
  direction = "10%",
  start,
  end
}: {
  select: Element;
  trigger: Element; // trigger to start the animation
  direction?: string;
  start?: string, // starting point of animation
  end?: string // end point of animation
}) {
  gsapProvider.gsap.to(select, {
    x: direction,
    scrollTrigger: {
      trigger: trigger,
      start: start ?? "top top",
      end: end ?? "bottom top",
      scrub: true,
    },

  });
}