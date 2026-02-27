import React from "react";
import Layout from "@theme/Layout";
import BrowserOnly from "@docusaurus/BrowserOnly";
import OnboardingWizard from "@/components/onboarding/OnboardingWizard";

export default function OnboardingPage() {
  return (
    <Layout title="Set Up Your Learner Profile" noFooter>
      <BrowserOnly>{() => <OnboardingWizard />}</BrowserOnly>
    </Layout>
  );
}
