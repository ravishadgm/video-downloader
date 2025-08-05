"use client";
import React from 'react';
import styles from "./styles.module.scss";

export default function page() {
    const titleId = React.useId();
    const termsId = React.useId();

    return (
        <section className={styles.wrapper}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1 id={titleId} className={styles.title}>
                        Terms of Service
                    </h1>
                    <p className={styles.description}>
                        Please read these terms carefully before using InstaDl.app services.
                    </p>
                </header>

                <div className={styles.content}
                    aria-labelledby={titleId}
                >
                    <article
                        className={styles.section}
                        aria-labelledby={`${termsId}-title`}
                    >


                        <div className={styles.sectionContent}>
                            <h3>1. Acceptance of Terms</h3>
                            <p>
                                By accessing and using InstaDl.app, you accept and agree to be bound by the terms and
                                provision of this agreement. If you do not agree to abide by the above, please do not
                                use this service.
                            </p>

                            <h3>2. Description of Service</h3>
                            <p>
                                InstaDl.app is a free online tool that allows users to download Instagram content including
                                photos, videos, reels, stories, IGTV, and carousel posts. Our service is provided "as is"
                                without any warranties.
                            </p>

                            <h3>3. User Responsibilities</h3>
                            <p>Users agree to:</p>
                            <ul>
                                <li>Use the service only for personal, non-commercial purposes</li>
                                <li>Respect copyright laws and intellectual property rights</li>
                                <li>Not use the service for any illegal or unauthorized purpose</li>
                                <li>Not attempt to interfere with the proper functioning of the service</li>
                            </ul>

                            <h3>4. Copyright and Intellectual Property</h3>
                            <p>
                                Users are responsible for ensuring they have the right to download and use any content.
                                InstaDl.app does not claim ownership of any downloaded content. We respect intellectual
                                property rights and expect our users to do the same.
                            </p>

                            <h3>5. Limitation of Liability</h3>
                            <p>
                                InstaDl.app shall not be liable for any direct, indirect, incidental, special, or
                                consequential damages resulting from the use or inability to use our service.
                            </p>

                            <h3>6. Service Availability</h3>
                            <p>
                                We strive to keep our service available 24/7, but we do not guarantee uninterrupted
                                access. We reserve the right to modify or discontinue the service at any time.
                            </p>
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
    );
}