import "./global.css";
import { Metadata } from "next";
import { Providers } from "./providers";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "@fepack/react-image demo",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
