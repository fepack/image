"use client";

import { MediaQueryProvider } from "@jsxcss/emotion";
import { Suspensive, SuspensiveProvider } from "@suspensive/react";
import type { PropsWithChildren } from "react";
import { Spinner } from "~/components/uis";

const suspensive = new Suspensive({
  defaultOptions: {
    delay: {
      ms: 1200,
    },
    suspense: {
      fallback: <Spinner />,
    },
  },
});

export const Providers = ({ children }: PropsWithChildren) => (
  <MediaQueryProvider>
    <SuspensiveProvider value={suspensive}>{children}</SuspensiveProvider>
  </MediaQueryProvider>
);
