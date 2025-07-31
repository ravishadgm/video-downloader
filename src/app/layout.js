import Script from "next/script";
import "../styles/globals.scss";
import Header from "@/layout/Header/Page";
import Footer from "@/layout/Footer/Page";

export const metadata = {
  title: "Instagram Downloader",
  description: "Download Instagram Video,Photos,IGTV & Reels",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head></head>
      <body className="layout-wrapper">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
