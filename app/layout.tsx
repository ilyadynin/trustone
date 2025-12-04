import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TrustOne - Blockchain Product Certificates",
  description: "Verify product authenticity on the blockchain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
