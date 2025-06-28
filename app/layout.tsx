import "@/app/_ui/css/globals.css";
import { Toaster } from "@/components/shadcn/toaster";
import { ThemeProvider } from "@/lib/context";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Image Caption Generator",
  description: "Upload your image and get AI-generated captions instantly",
  authors: [{ name: "Meigo Cadalzo", url: "https://cadalzomeigo.vercel.app" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
