export default function useDocusaurusContext() {
  return {
    siteConfig: {
      customFields: {
        practiceEnabled: true,
        learnerProfileApiUrl: "http://localhost:8004",
      },
    },
    i18n: { currentLocale: "en" },
  };
}
