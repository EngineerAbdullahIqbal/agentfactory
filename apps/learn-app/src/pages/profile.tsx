import React from "react";
import Layout from "@theme/Layout";
import BrowserOnly from "@docusaurus/BrowserOnly";
import ProfileSettings from "@/components/profile/ProfileSettings";

export default function ProfilePage() {
  return (
    <Layout title="My Learner Profile">
      <BrowserOnly>{() => <ProfileSettings />}</BrowserOnly>
    </Layout>
  );
}
