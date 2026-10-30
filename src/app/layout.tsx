import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "floki24 – Saunen, Gartenmöbel & Wohnen",
  description: "Entdecken Sie Wellnessprodukte, Gartenmöbel und Wohnideen bei floki24."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="de"><body>{children}</body></html>;
}
