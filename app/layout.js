import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/providers/theme-provider";

import { Inter } from "next/font/google";
import FooterSection from "./(sections)/FooterSection";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Event Mint",
  description: "Enhancing Events with Interaction",
  keywords:
    "Event Mint, Interactive Events, Event Management, Event Technology, Interactive Features, Seamless Interaction",
  author: "Event Mint Team",
  viewport: "width=device-width, initial-scale=1.0",
  url: "https://eventmint.xyz",
  image:
    "https://res.cloudinary.com/dtfvdjvyr/image/upload/v1719802304/event-logo_iyl1ec.png",
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
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="author" content={metadata.author} />
        <meta name="viewport" content={metadata.viewport} />
        <link
          rel="icon"
          href="https://res.cloudinary.com/dtfvdjvyr/image/upload/v1720387059/evenmint0_yeqwyy.png"
        />
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:url" content={metadata.url} />
        <meta property="og:image" content={metadata.image} />
        <meta property="og:type" content="website" />
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content={metadata.image} />
        <meta name="twitter:url" content={metadata.url} />
        {/* Add more meta tags as needed */}
      </head>
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
