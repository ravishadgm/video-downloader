import Script from "next/script";
import Header from "@/layout/Header/Page";
import Footer from "@/layout/Footer/Page";
import "../styles/globals.scss";

export default function RootLayout({ children }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "InstaDL",
    "url": "https://video-downloader-sigma-seven.vercel.app/",
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "email": "abc@gmail.com",
        "contactType": "customer support",
        "availableLanguage": ["English"]
      }
    ]
  };

  return (
    <html lang="en">
      <head>
        <Script
          id="organization-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body className="layout-wrapper">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
