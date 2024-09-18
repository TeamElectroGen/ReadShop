import localFont from "next/font/local";
import "./globals.css";

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
  title: "ReadShop | Your One-Stop Shop for Books, eBooks, and Audiobooks",
  description: "Discover a world of knowledge and entertainment at ReadShop, where we offer a vast collection of books, audiobooks, and eBooks. From timeless classics to the latest bestsellers, we have something for every reader. Whether you prefer a printed book, the convenience of an eBook, or the immersive experience of an audiobook, ReadShop is here to cater to all your reading needs.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
