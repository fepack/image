"use client";

import { Load } from "@fepack/react-image";
import { ErrorBoundary, Suspense } from "@suspensive/react";
import Link from "next/link";
import { Spinner } from "~/components/uis";

export default function Home() {
  return (
    <div>
      <Link href="/load">to load</Link>
      <ErrorBoundary fallback={() => <>load image error</>}>
        <Suspense.CSROnly fallback={<Spinner />}>
          <Load src="https://ik.imagekit.io/ikmedia/women-dress-2.jpg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {(loaded) => <img src={loaded.src} />}
          </Load>
        </Suspense.CSROnly>
      </ErrorBoundary>
      <ErrorBoundary fallback={() => <>load image error</>}>
        <Suspense.CSROnly fallback={<Spinner />}>
          <Load src="https://ik.imagekit.io/ikmedia/wome">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {(loaded) => <img src={loaded.src} />}
          </Load>
        </Suspense.CSROnly>
      </ErrorBoundary>
    </div>
  );
}
