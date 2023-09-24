"use client";

import { Load } from "@fepack/react-image";
import { Suspense } from "@suspensive/react";
import Link from "next/link";
import { Area, Spinner } from "~/components/uis";

export default function Page() {
  return (
    <div>
      <Link href="/">to home</Link>
      <Area title="Load">
        <Suspense.CSROnly fallback={<Spinner />}>
          <Load src="https://ik.imagekit.io/ikmedia/women-dress-2.jpg">
            {(loaded) => <img src={loaded.src} />}
          </Load>
        </Suspense.CSROnly>
      </Area>
    </div>
  );
}
