import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useAlternatePageUtils} from '@docusaurus/theme-common/internal';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";

export function LocaleDropdown() {
  const {i18n} = useDocusaurusContext();
  const alternatePageUtils = useAlternatePageUtils();

  const currentLocale = i18n.currentLocale;

  const handleLocaleChange = (locale: string) => {
    const url = alternatePageUtils.createUrl({
      locale,
      fullyQualified: false,
    });
    window.location.href = url;
  };

  const currentLocaleConfig = i18n.localeConfigs[currentLocale];
  const currentLabel = currentLocaleConfig?.label || 'English';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" title="Change language">
          <Globe className="w-5 h-5" />
          <span className="sr-only">Language: {currentLabel}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {i18n.locales.map((locale) => {
          const config = i18n.localeConfigs[locale];
          const isActive = locale === currentLocale;
          return (
            <DropdownMenuItem
              key={locale}
              onClick={() => handleLocaleChange(locale)}
              className={isActive ? 'bg-accent' : ''}
            >
              <div className="flex items-center justify-between w-full">
                <span>{config?.label || locale}</span>
                {isActive && <span>✓</span>}
              </div>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
