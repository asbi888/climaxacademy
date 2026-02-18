import type { Metadata } from "next";
import { DM_Serif_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Climax Academy | Premium Corporate Training",
  description:
    "Transform your workforce with world-class soft skills training programmes. Leadership, Communication, Team Building & more. Powered by Climax Production Ltd, Mauritius.",
  icons: {
    icon: "/images/logocl.png",
    apple: "/images/logocl.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSerif.variable} ${jakarta.variable} antialiased bg-brand-bg text-brand-text`}
      >
        {children}
      </body>
    </html>
  );
}
