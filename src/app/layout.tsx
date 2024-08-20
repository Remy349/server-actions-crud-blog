import "@/app/globals.css";
import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import { Toaster } from "sonner";
import { Navbar } from "./_components/navbar";

const raleway = Raleway({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Server actions with NextJS - Blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={raleway.className}>
        <Navbar />
        <main className="bg-muted/40 min-h-screen mt-16">
          <section className="pt-[2.5rem] pb-[2.5rem]">
            <div className="px-6 mx-auto max-w-5xl">{children}</div>
          </section>
        </main>
        <Toaster closeButton richColors position="top-right" />
      </body>
    </html>
  );
}
