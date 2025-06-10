import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import CusotmLayout from "@/custom-layout";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Gym Website",
  description: "This is a Gym website powered by Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <CusotmLayout>{children}</CusotmLayout>
          <Toaster position="top-center" reverseOrder={false} />
        </body>
      </html>
    </ClerkProvider>
  );
}
