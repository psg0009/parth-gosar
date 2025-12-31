import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Parth Gosar | AI/ML Researcher & Software Engineer",
  description:
    "Portfolio of Parth Gosar - AI/ML Researcher at USC, 2025 Oswald Award recipient, and founder of INSURESPECTRE. Specializing in deep learning, NLP, and building impactful AI solutions.",
  keywords: [
    "Parth Gosar",
    "AI Researcher",
    "Machine Learning",
    "USC",
    "Penn State",
    "Software Engineer",
    "Deep Learning",
    "NLP",
    "Computer Science",
  ],
  authors: [{ name: "Parth Gosar" }],
  creator: "Parth Gosar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://psg.bio",
    title: "Parth Gosar | AI/ML Researcher & Software Engineer",
    description:
      "AI/ML Researcher at USC, 2025 Oswald Award recipient, building impactful AI solutions.",
    siteName: "Parth Gosar Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Parth Gosar | AI/ML Researcher & Software Engineer",
    description:
      "AI/ML Researcher at USC, 2025 Oswald Award recipient, building impactful AI solutions.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Parth Gosar",
  url: "https://psg.bio",
  jobTitle: "AI/ML Researcher & Software Engineer",
  worksFor: {
    "@type": "Organization",
    name: "University of Southern California",
  },
  alumniOf: [
    {
      "@type": "Organization",
      name: "Penn State University",
    },
  ],
  sameAs: [
    "https://www.linkedin.com/in/parth-gosar-04042b1b1",
    "https://github.com/psg0009",
    "mailto:parthgosar8@gmail.com",
  ],
  knowsAbout: [
    "Machine Learning",
    "Artificial Intelligence",
    "Deep Learning",
    "Natural Language Processing",
    "Software Engineering",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} font-body antialiased bg-black text-white`}
      >
        {/* Noise Overlay */}
        <div className="noise-overlay" />

        {children}
      </body>
    </html>
  );
}
