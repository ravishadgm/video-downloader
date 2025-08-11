import React from "react";
import styles from "./styles.module.scss";
import legalPagesData from "@/dataStore/legalPagesContent";

export default function Page({ params }) {
  const { slug } = params;
  const pageData = legalPagesData[slug];

  if (!pageData) {
    return <div className={styles.wrapper}>Page not found</div>;
  }

  const titleId = React.useId();
  const contentId = React.useId();

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 id={titleId} className={styles.title}>
            {pageData.title}
          </h1>
          <p className={styles.description}>{pageData.description}</p>
        </header>

        <div className={styles.content} aria-labelledby={titleId}>
          <article
            className={styles.section}
            aria-labelledby={`${contentId}-title`}
          >
            <div className={styles.sectionContent}>
              {pageData.sections.map((section, idx) => (
                <div key={idx}>
                  <h3>{section.heading}</h3>
                  <p>{section.text}</p>
                  {section.list && (
                    <ul>
                      {section.list.map((item, liIdx) => (
                        <li key={liIdx}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </article>

          <section className={styles.contact}>
            <h2>Contact Us</h2>
            <p>
              If you have any questions about these Terms of Service or Privacy
              Policy, please contact us at:
            </p>
            <p>
              Email:{" "}
              <a
                href="mailto:support@instadl.app"
                className={styles.contactLink}
              >
                support@instadl.app
              </a>
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
