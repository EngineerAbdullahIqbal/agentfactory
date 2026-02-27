import React from "react";
import Layout from "@theme-original/Layout";
import type { WrapperProps } from "@docusaurus/types";
import { ProfileNudgeBanner } from "@/components/profile/ProfileNudgeBanner";

type Props = WrapperProps<typeof Layout>;

export default function LayoutWrapper(props: Props) {
  const children = (
    <>
      <ProfileNudgeBanner />
      {props.children}
    </>
  );

  return <Layout {...props}>{children}</Layout>;
}
