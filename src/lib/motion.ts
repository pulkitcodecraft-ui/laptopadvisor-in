import type { TargetAndTransition, Transition } from "framer-motion";

export const motionEase = [0.22, 1, 0.36, 1] as const;

export const scrollViewport = { once: true, amount: 0.2 } as const;

export const scrollFadeTransition: Transition = {
  duration: 0.5,
  ease: motionEase,
};

export function staggerDelay(index: number, reducedMotion: boolean): number {
  return reducedMotion ? 0 : index * 0.08;
}

export function scrollFadeVariants(
  index = 0,
  reducedMotion = false,
): {
  initial: TargetAndTransition;
  whileInView: TargetAndTransition;
  viewport: typeof scrollViewport;
  transition: Transition;
} {
  if (reducedMotion) {
    return {
      initial: { opacity: 1, y: 0 },
      whileInView: { opacity: 1, y: 0 },
      viewport: scrollViewport,
      transition: { duration: 0 },
    };
  }

  return {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: scrollViewport,
    transition: { ...scrollFadeTransition, delay: staggerDelay(index, false) },
  };
}

export function sectionFadeVariants(reducedMotion = false) {
  return scrollFadeVariants(0, reducedMotion);
}

export function pageItemVariants(reducedMotion = false, index = 0) {
  return scrollFadeVariants(index, reducedMotion);
}

export const cardHoverTransition = { duration: 0.25, ease: motionEase } as const;

export function cardHoverMotion(reducedMotion = false) {
  if (reducedMotion) return {};
  return {
    whileHover: { y: -4, transition: cardHoverTransition },
    whileTap: { scale: 0.995, transition: { duration: 0.12 } },
  };
}
