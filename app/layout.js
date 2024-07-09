import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/providers/theme-provider";

import { Inter } from "next/font/google";
import FooterSection from "./(sections)/FooterSection";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Event Mint",
  description: "By the students, for the students!",
};

export default async function RootLayout({ children }) {
  function isTimestampWithinOneYear(timestamp) {
    // Convert the provided timestamp to milliseconds
    const milliseconds = timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6;

    // Create a Date object from the milliseconds
    const providedDate = new Date(milliseconds);

    // Calculate date one year ago from today
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    // Compare provided timestamp with date one year ago
    return providedDate > oneYearAgo;
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <FooterSection />
        </ThemeProvider>
      </body>
    </html>
  );
}
