import React from "react";
import { mainFaq } from "@/dataStore/data";
import FaqSection from "@/common/Faq/Faq";

export default function page() {
  return (
    <FaqSection
      title="FAQ - frequently asked question"
      intro="Ok. Suppose you are here on this page now. In that case, you might be looking for clarifying questions about how to download Instagram photos and videos. So, look below and find the most commonly asked questions about one of the best Instagram Downloaders and their answers."
      faqs={mainFaq}
    />
  );
}
