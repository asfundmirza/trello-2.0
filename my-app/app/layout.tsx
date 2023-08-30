import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "trello 2.0",
  description: "trello clone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-200">{children}</body>
    </html>
  );
}
