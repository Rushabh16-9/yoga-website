import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

const outfit = Outfit({
    subsets: ["latin"],
    variable: "--font-outfit",
    display: "swap",
});

export const metadata: Metadata = {
    title: {
        default: "Yofit - Transform Your Practice | Professional Yoga Platform",
        template: "%s | Yofit",
    },
    description:
        "Join Yofit, the premier online yoga platform. Access world-class instructors, personalized practice tracking, and a supportive community. Start your transformation today.",
    keywords: [
        "yoga",
        "online yoga",
        "yoga classes",
        "meditation",
        "wellness",
        "fitness",
        "mindfulness",
        "yoga instructor",
    ],
    authors: [{ name: "Yofit Team" }],
    creator: "Yofit",
    publisher: "Yofit",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "/",
        title: "Yofit - Transform Your Practice",
        description:
            "Join Yofit, the premier online yoga platform with world-class instructors and personalized tracking.",
        siteName: "Yofit",
    },
    twitter: {
        card: "summary_large_image",
        title: "Yofit - Transform Your Practice",
        description:
            "Join Yofit, the premier online yoga platform with world-class instructors.",
        creator: "@yofit",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
            <body className="antialiased">
                <Navbar />
                <main className="min-h-screen">{children}</main>
                <Footer />
            </body>
        </html>
    );
}
