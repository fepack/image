"use client";

import { Load } from "@fepack/react-image";
import { Suspense } from "@suspensive/react";
import Link from "next/link";
import { Area } from "~/components/uis";

const BoundaryPage = () => (
  <div>
    <Link href="/">to home</Link>
    <Area title="Load">
      <Suspense.CSROnly>
        <Load src="https://ik.imagekit.io/ikmedia/women-dress-2.jpg">
          {(loaded) => <img src={loaded.src} />}
        </Load>
      </Suspense.CSROnly>
    </Area>
  </div>
);

export default BoundaryPage;
