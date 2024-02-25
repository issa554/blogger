import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Provider from "./components/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MY Blogger",
  description: "Blogger app with next js and prisma",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>

        <Header />
        {children}
        </Provider>
        </body>
    </html>
  );
}
