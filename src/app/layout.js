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
    "ReadShop is an innovative ecommerce platform tailored for book enthusiasts, delivering a seamless browsing and purchasing experience. With advanced search, filter, and categorization options, users can explore a wide variety of books, create personalized wishlists and reading lists, and follow their favorite authors. A Gemini-powered AI chatbot provides real-time customer support, enhancing user assistance and experience. With trending and best-selling sections, secure payments via Stripe, and user reviews and ratings, ReadShop redefines the online bookstore experience.",
  keywords: [
    "ReadShop",
    " online bookstore",
    " digital reading",
    " books",
    " author follow",
    " book reviews",
    " secure payment",
    " ecommerce bookstore",
    " customer support AI chatbot",
    " Gemini chatbot",
    " book search",
    " book categorization",
  ],
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
