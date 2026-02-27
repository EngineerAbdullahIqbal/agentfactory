import React from "react";

const createMotionComponent = (tag: string) =>
  React.forwardRef((props: any, ref: any) => {
    const {
      initial,
      animate,
      exit,
      variants,
      transition,
      layout,
      whileHover,
      whileTap,
      whileInView,
      ...rest
    } = props;
    return React.createElement(tag, { ...rest, ref });
  });

export const motion = new Proxy({} as Record<string, any>, {
  get: (_target, prop: string) => createMotionComponent(prop),
});

export const AnimatePresence = ({ children }: any) => children;
export const MotionConfig = ({ children }: any) => children;
