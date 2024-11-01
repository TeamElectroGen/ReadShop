import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import localFont from "next/font/local";
import "./globals.css";
// import { Toaster } from "@/components/ui/toaster";
import Chat from "@/components/Chat";
import AuthProvider from "@/services/AuthProvider";
import Providers from "@/services/Providers";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "./context/CartContext";

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
  title: {
    default: "ReadShop",
    template: "%s | ReadShop",
  },
  description:
    "Discover a world of knowledge and entertainment at ReadShop, where we offer a vast collection of books, audiobooks, and eBooks. From timeless classics to the latest bestsellers, we have something for every reader. Whether you prefer a printed book, the convenience of an eBook, or the immersive experience of an audiobook, ReadShop is here to cater to all your reading needs.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <Providers>
          <CartProvider>
            <body
              className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
              <Chat />
              <div className="main">
                <div className="gradient" />
              </div>

              <main className="app">
                <Navbar />
                <div className="main_content">{children}</div>
                <Toaster position="top-center" reverseOrder={true} />
                <Footer />
              </main>
            </body>
          </CartProvider>
        </Providers>
      </AuthProvider>
    </html>
  );
}
