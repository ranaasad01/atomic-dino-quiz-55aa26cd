import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LocaleProvider from "@/components/LocaleProvider";
import LanguageToggle from "@/components/LanguageToggle";

export const metadata: Metadata = {
  formatDetection: { telephone: false, date: false, email: false, address: false },
  title: "Dino Quiz! 🦕 — Test Your Dinosaur Knowledge",
  description:
    "Answer 10 fun dinosaur questions and find out if you are a Dino Master or a Dino Explorer. Play now!",
  openGraph: {
    title: "Dino Quiz! 🦕 — Test Your Dinosaur Knowledge",
    description:
      "Answer 10 fun dinosaur questions and find out if you are a Dino Master or a Dino Explorer. Play now!",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="#"
          rel="stylesheet"
        />
      </head>
      <body>
        <LocaleProvider>
          <LanguageToggle />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}