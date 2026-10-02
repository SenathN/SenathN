import type { Metadata } from "next";
import { Roboto_Condensed, JetBrains_Mono, Inter } from "next/font/google";
import ThemeScript from "@/components/ThemeScript";
import { site } from "../../content/site";
import "./globals.css";

const condensed = Roboto_Condensed({
  weight: ["500", "700", "800"],
  subsets: ["latin"],
  variable: "--font-condensed",
  display: "swap",
});

const mono = JetBrains_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const siteUrl = site.siteUrl;

export const metadata: Metadata = {
  metadataBase: new URL(new URL(siteUrl).origin),
  title: `${site.name} — ${site.role}`,
  description: site.tagline,
  openGraph: {
    title: site.name,
    description: site.tagline,
    url: siteUrl,
    siteName: site.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.tagline,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport = { themeColor: "#000000", colorScheme: "dark" };

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: "Full-stack and DevOps Engineer",
  email: `mailto:${site.contact.email}`,
  url: siteUrl,
  sameAs: site.contact.socials.map((s) => s.url),
  address: {
    "@type": "PostalAddress",
    addressLocality: "Malabe",
    addressCountry: "LK",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${condensed.variable} ${mono.variable} ${body.variable}`}>
      <head>
        <ThemeScript />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="font-body antialiased">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
