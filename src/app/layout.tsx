import { ThemeProvider } from "@/components/providers/theme-provider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/nav/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/nav/app-sidebar";
import { AuthSessionProvider } from '@/components/providers/session-provider';
import { CartInitializer } from '@/components/cart/cart-initializer';
import { WishlistInitializer } from "@/components/wishlist/wishlist-initializer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: 'All In One Store - Everything You Need, One Place',
    template: '%s | All In One Store'
  },
  description: 'Your ultimate shopping destination. All In One Store offers electronics, fashion, home goods, beauty products, and more with fast shipping and exceptional customer service. Shop everything you need in one place!',
  keywords: 'online shopping, ecommerce, electronics, fashion, home decor, beauty products, daily deals, free shipping, All In One Store',
  authors: [{ name: 'All In One Store' }],
  creator: 'All In One Store',
  publisher: 'All In One Store',
  
  // Open Graph for social media sharing
  
  // Additional important metadata
  metadataBase: new URL('https://e-commerce-beige-ten-84.vercel.app'),
  manifest: '/manifest.json',
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Prevent automatic format detection
  formatDetection: {
    telephone: false,
    date: false,
    address: false,
    email: false,
  },

  // Search engine verification (add your actual codes later)
  verification: {
    google: 'your-google-verification-code',
  },

  // Additional metadata
  category: 'ecommerce',
  classification: 'online shopping',
  referrer: 'origin-when-cross-origin',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} >
        <AuthSessionProvider>
          <CartInitializer />
          <WishlistInitializer />
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <SidebarProvider
              style={
                {
                  "--sidebar-width": "calc(var(--spacing) * 72)",
                  "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
              }
            >
              <AppSidebar variant="floating" />
              <SidebarInset>
                <SiteHeader />
                  {children}
              </SidebarInset>
            </SidebarProvider>
          </ThemeProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
