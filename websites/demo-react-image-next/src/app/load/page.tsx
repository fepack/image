"use client";

import { Suspense } from "@suspensive/react";
import { Load } from "@fepack/react-image";
import { Area } from "~/components/uis";
import Link from "next/link";

const BoundaryPage = () => {
  return (
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
};

export default BoundaryPage;
