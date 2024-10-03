import type { Metadata } from "next";
import localFont from "next/font/local";
import { Lexend, Bricolage_Grotesque, Poppins } from "next/font/google";
import "./globals.css";
import "./TextEditor.css";
import Navbar from "./Navbar";
import SessionAuthProvider from "@/provider/SessionAuthProvider";
import { Toaster } from "@/components/ui/toaster";
import Footer from "./Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const lexend = Lexend({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "400", "800"],
  variable: "--font-lexend",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "400", "800"],
  variable: "--font-bricolage",
});

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bricolage.variable} ${lexend.variable} ${poppins.variable} antialiased overflow-x-hidden overflow-y-auto`}
      >
        <SessionAuthProvider>
          <Navbar />
          {children}
          <Footer />
        </SessionAuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
