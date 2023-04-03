import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { IBM_Plex_Mono } from "@next/font/google";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: "600",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={ibmPlexMono.className}>
      <Component {...pageProps} />
    </main>
  );
}
