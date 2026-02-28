/** Shared Framer Motion variants for onboarding step animations. */

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
};

export const staggerContainerVariants = {
  visible: { transition: { staggerChildren: 0.1 } },
};
