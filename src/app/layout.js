import "@/styles/reset.css";
import "@/styles/normalize.css";
import "@/styles/variables.css";
import "@/styles/global.css";

import { helveticaNowDisplay } from "@/config/fonts";

import { Providers } from "./providers";
import { cookieToInitialState } from "wagmi";
import { headers } from "next/headers";
import { wagmiConfig } from "@/config/wagmi";

export const metadata = {
  title: "Resonator",
  description: "",
};

export default async function RootLayout({ children }) {
  const headersList = await headers();
  const initialState = cookieToInitialState(
    wagmiConfig,
    headersList.get("cookie")
  );

  return (
    <html lang="en">
      <body className={`${helveticaNowDisplay.className}`}>
        <Providers initialState={initialState}>{children}</Providers>
      </body>
    </html>
  );
}
