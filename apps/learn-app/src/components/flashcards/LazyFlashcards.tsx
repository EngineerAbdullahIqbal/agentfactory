import React, { lazy, Suspense } from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import type { FlashcardsProps } from "./types";

const Flashcards = lazy(() => import("./Flashcards"));

export default function LazyFlashcards(props: FlashcardsProps) {
  return (
    <BrowserOnly fallback={<div style={{ minHeight: 300 }} />}>
      {() => (
        <Suspense
          fallback={
            <div style={{ minHeight: 300 }}>Loading flashcards...</div>
          }
        >
          <Flashcards {...props} />
        </Suspense>
      )}
    </BrowserOnly>
  );
}
