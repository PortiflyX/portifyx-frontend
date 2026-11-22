import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Sidebar } from "@/components/layout/sidebar";
import { BottomNav } from "@/components/layout/bottom-nav";

export const metadata: Metadata = {
  title: "PortifyX | Trade Platform Multi-Exchange Portfolio",
  description: "Next-generation crypto portfolio dashboard modeled after Bitkub Trade Platform engineering patterns.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background text-slate-100 flex min-h-screen antialiased">
        <Providers>
          <Sidebar />
          <div className="flex-1 flex flex-col min-w-0 pb-16 lg:pb-0">
            {children}
          </div>
          <BottomNav />
        </Providers>
      </body>
    </html>
  );
}
