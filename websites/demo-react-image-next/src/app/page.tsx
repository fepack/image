"use client";

import { Load } from "@fepack/react-image";
import { Suspense, ErrorBoundary } from "@suspensive/react";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href={"/load"}>to load</Link>
      <ErrorBoundary fallback={() => <>load image error</>}>
        <Suspense.CSROnly>
          <Load src="https://ik.imagekit.io/ikmedia/women-dress-2.jpg">
            {(loaded) => <img src={loaded.src} />}
          </Load>
        </Suspense.CSROnly>
      </ErrorBoundary>
      <ErrorBoundary fallback={() => <>load image error</>}>
        <Suspense.CSROnly>
          <Load src="https://ik.imagekit.io/ikmedia/wome">
            {(loaded) => <img src={loaded.src} />}
          </Load>
        </Suspense.CSROnly>
      </ErrorBoundary>
    </div>
  );
}
