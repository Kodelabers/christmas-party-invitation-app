import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CodeMas – KodeLab & Neyho Christmas party",
  description: "An online invitation and RSVP system for the Christmas party organised by KodeLab and Neyho",
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

