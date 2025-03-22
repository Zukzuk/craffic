import type { Metadata } from "next";
import React from "react";
import Link from "next/link";
import { PaginationProvider } from "@/contexts/PaginationContext";

import "./globals.css";
import { ThemeProvider } from "@material-tailwind/react";

export const metadata: Metadata = {
  title: "Craffic",
  description: "Browse comics!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PaginationProvider>
      <html lang="en" className="h-full w-full bg-gray-900 text-white">
        <body className="flex flex-col h-screen overflow-hidden">
          {/* Header */}
          <header className="h-8 bg-gray-900 flex items-center justify-center">
            <p>Craffic</p>
          </header>

          {/* Main Content */}
          <div className="flex flex-1 overflow-hidden pb-8">
            {/* Navigation Sidebar */}
            <nav className="w-32 bg-gray-900 pl-4 pt-16 space-y-2">
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/series?page=1"
                    className="block text-gray-300 hover:text-white"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/settings"
                    className="block text-gray-300 hover:text-white"
                  >
                    Settings
                  </Link>
                </li>
                <li>
                  <Link
                    href="/account"
                    className="block text-gray-300 hover:text-white"
                  >
                    Account
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Main Content Area */}
            <main className="flex-1 bg-gray-800 overflow-y-scroll overflow-x-hidden thin-scroll relative">
              {children}
            </main>
          </div>

          {/* Footer */}
          <footer className="fixed bottom-0 w-full h-8 bg-gray-900 flex items-center justify-center">
            <span>Footer</span>
          </footer>
        </body>
      </html>
    </PaginationProvider>
  );
}
