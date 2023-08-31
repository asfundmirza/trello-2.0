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
//            background-color: #D9AFD9;
//background-image: linear-gradient(0deg, #D9AFD9 0%, #97D9E1 100%);
