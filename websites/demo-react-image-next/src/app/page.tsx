"use client";

import { Load, extractRGBAs } from "@fepack/react-image";
import { ErrorBoundary, Suspense } from "@suspensive/react";
import Link from "next/link";
import { useState } from "react";
import { Spinner } from "~/components/uis";

export default function Home() {
  const [size, setSize] = useState(8);

  return (
    <div>
      <Link href="/load">to load</Link>
      <ErrorBoundary fallback={() => <>load image error</>}>
        <Suspense.CSROnly fallback={<Spinner />}>
          <Load src="https://ik.imagekit.io/ikmedia/women-dress-2.jpg">
            {(image) => <img src={image.src} />}
          </Load>
        </Suspense.CSROnly>
      </ErrorBoundary>
      <ErrorBoundary fallback={() => <>load image error</>}>
        <Suspense.CSROnly fallback={<Spinner />}>
          <Load src="https://ik.imagekit.io/ikmedia/wome">
            {(image) => <img src={image.src} />}
          </Load>
        </Suspense.CSROnly>
      </ErrorBoundary>
      <input
        type="range"
        min={1}
        max={20}
        onChange={(e) => setSize(Number(e.target.value))}
      />

      <Suspense.CSROnly fallback={"image loading..."}>
        <Load src={"/images/test.png"}>
          {(image) => (
            <div
              style={{
                width: image.width * size,
                height: image.height * size,
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              {extractRGBAs(image).map((rgba, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: `rgba(${rgba.join(",")})`,
                    width: 1 * size,
                    height: 1 * size,
                    borderRadius: "50%",
                  }}
                />
              ))}
            </div>
          )}
        </Load>
      </Suspense.CSROnly>
    </div>
  );
}
