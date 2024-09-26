import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "ReadShop",
  description:
    "Discover a world of knowledge and entertainment at ReadShop, where we offer a vast collection of books, audiobooks, and eBooks. From timeless classics to the latest bestsellers, we have something for every reader. Whether you prefer a printed book, the convenience of an eBook, or the immersive experience of an audiobook, ReadShop is here to cater to all your reading needs.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="main">
          <div className="gradient" />
        </div>

        <main className="app">
          <Navbar />
          <div className="main_content">{children}</div>
          <Footer />
        </main>
        <Toaster />
      </body>
    </html>
  );
}
