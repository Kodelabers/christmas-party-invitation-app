import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kodelab & Neyho Christmas party",
  description: "An online invitation and RSVP system for the Christmas party organised by Kodelab and Neyho",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}