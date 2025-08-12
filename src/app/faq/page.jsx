import React from "react";
import { mainFaq } from "@/dataStore/faqContent";
import FaqSection from "@/common/Faq/Faq";

export const metadata = {
  title: "Faq - InstaDL",
  description:
    "Find answers to the most frequently asked questions about InstaDL, including downloads, formats, privacy, and troubleshooting.",
};

export default function page() {
  return (
    <FaqSection
      title="FAQ - frequently asked question"
      intro="Ok. Suppose you are here on this page now. In that case, you might be looking for clarifying questions about how to download Instagram photos and videos. So, look below and find the most commonly asked questions about one of the best Instagram Downloaders and their answers."
      faqs={mainFaq}
    />
  );
}
