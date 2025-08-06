
import React from "react";
import styles from "./styles.module.scss";
function page() {
        const titleId = React.useId();
        const privacyId = React.useId();
    return (
        <>
   <section className={styles.wrapper}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1 id={titleId} className={styles.title}>
                        Privacy Policy
                    </h1>
                    <p className={styles.description}>
                        Please read our privacy policy carefully before using InstaDl.app services.
                    </p>
                </header>

                <div className={styles.content}
                    aria-labelledby={titleId}
                >
                    <article
                        className={styles.section}
                        aria-labelledby={`${privacyId}-title`}
                    >
                        <div className={styles.sectionContent}>
                            <h3>1. Information We Collect</h3>
                            <p>
                                InstaDl.app is committed to protecting your privacy. We collect minimal information to
                                provide our service:
                            </p>
                            <ul>
                                <li>Instagram URLs you submit for downloading</li>
                                <li>Basic usage analytics (page views, download counts)</li>
                                <li>Technical information (IP address, browser type, device information)</li>
                            </ul>

                            <h3>2. How We Use Information</h3>
                            <p>We use collected information to:</p>
                            <ul>
                                <li>Process your download requests</li>
                                <li>Improve our service quality and performance</li>
                                <li>Monitor service usage and prevent abuse</li>
                                <li>Provide technical support when needed</li>
                            </ul>

                            <h3>3. Data Storage and Security</h3>
                            <p>
                                We do not store downloaded content on our servers. Instagram URLs are processed in
                                real-time and not permanently stored. We implement appropriate security measures to
                                protect your information.
                            </p>

                            <h3>4. Third-Party Services</h3>
                            <p>
                                Our service may use third-party analytics tools to understand usage patterns. These
                                services have their own privacy policies that we encourage you to review.
                            </p>

                            <h3>5. Cookies and Tracking</h3>
                            <p>
                                We may use cookies and similar technologies to enhance user experience and analyze
                                service usage. You can control cookie settings through your browser preferences.
                            </p>

                            <h3>6. Data Sharing</h3>
                            <p>
                                We do not sell, trade, or share your personal information with third parties except
                                as required by law or to protect our legal rights.
                            </p>

                            <h3>7. User Rights</h3>
                            <p>You have the right to:</p>
                            <ul>
                                <li>Request information about data we collect</li>
                                <li>Request deletion of your data</li>
                                <li>Opt-out of analytics tracking</li>
                                <li>Contact us with privacy concerns</li>
                            </ul>
                        </div>
                    </article>

                    <section className={styles.contact}>
                        <h2>Contact Us</h2>
                        <p>
                            If you have any questions about these Terms of Service or Privacy Policy, please contact us at:
                        </p>
                        <p>
                            Email:{' '} <a href="mailto:support@instadl.app" className={styles.contactLink}>
                                support@instadl.app
                            </a>
                        </p>
                    </section>
                </div>
            </div>
        </section>
        </>
    );
}

export default page;
