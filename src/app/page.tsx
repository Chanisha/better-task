"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Get the "Why Better" section element
      const whyBetterSection = document.querySelector('[aria-label="Why we\'re better"]') as HTMLElement;
      if (whyBetterSection) {
        const sectionTop = whyBetterSection.offsetTop;
        const scrollPosition = window.scrollY;
        // Change background when we reach the "Why Better" section
        setScrolled(scrollPosition >= sectionTop - 100);
      } else {
        // Fallback to original logic if section not found
        setScrolled(window.scrollY > 20);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={styles.container}>
      <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ""}`}>
        <div className={styles.headerInner}>
          <div className={styles.leftGroup}>
            <Link href="/" aria-label="Better home" className={styles.brand}>
              <Image src="/better-logo.png" alt="Better" width={88} height={28} priority />
            </Link>
            <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`} aria-label="Primary">
              <a href="#buy">Buy</a>
              <a href="#refinance">Refinance</a>
              <a href="#heloc">HELOC</a>
              <a href="#rates">Rates</a>
              <a href="#better-plus">Better+</a>
              <a href="/about-us">About Us</a>
            </nav>
          </div>

          <div className={styles.headerActions}>
            <a href="tel:4155238837" className={styles.phoneButton} aria-label="Call us">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M21 15.46v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 1.54 4.18 2 2 0 0 1 3.5 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.77.63 2.6a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.48-2.09a2 2 0 0 1 2.11-.45c.83.3 1.7.51 2.6.63A2 2 0 0 1 21 15.46z" fill="currentColor" />
              </svg>
            </a>
            <a href="#signin" className={styles.signIn}>Sign in</a>
            <button
              className={styles.menuButton}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.heroKicker}>The first</div>
            <h1 className={styles.heroTitle}>
              <span className={styles.gradientWord}>AI-powered</span>
              {" "}
              <span className={styles.heroTitleRest}>Mortgage</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Our tech unlocks lower rates, higher chances of approval, and a lightning-fast
              process from approval to closing. Over $100 billion funded.
            </p>
            <div className={styles.heroCtas}>
              <a href="#get-started" className={styles.primaryCta}>
                Start my pre-approval
              </a>
              <span className={styles.ctaMeta}>3 min | No hard credit check</span>
            </div>

          </div>

          <div className={styles.heroVisual}>
            <Image
              src="/hero-cards.png"
              alt=""
              fill
              className={styles.heroImage}
              priority
            />
          </div>
        </section>


        <section className={styles.whyBetter} aria-label="Why we’re better">
          <div className={styles.whyInner}>
            <div className={styles.storyCard}>
              <div className={styles.storyVideo}>
                <Image src="/story-paul.png" alt="Customer story" fill className={styles.storyImage} />
                <button className={styles.playButton} aria-label="Play video">▶</button>
              </div>
            </div>
            <div className={styles.whyCopy}>
              <h2 className={styles.whyTitle}>Find out why we’re better.</h2>
              <a href="#stories" className={styles.secondaryCta}>See all our stories</a>
              <div className={styles.trustInline}>
                <span className={styles.trustBrand}>Trustpilot</span>
                <strong>Excellent</strong>
                <span>4.4 out of 5</span>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.faqHub} aria-label="Got questions?">
          <div className={styles.faqHubInner}>
            <div className={styles.faqHead}>
              <h2>
                <span>Got questions?</span>
                <br />
                <span>We&#39;ve got answers</span>
              </h2>
              <div className={styles.faqTabs} role="tablist" aria-label="FAQ categories">
                <button className={`${styles.faqTab} ${styles.faqTabActive}`} role="tab" aria-selected="true">Our products</button>
                <button className={styles.faqTab} role="tab" aria-selected="false">Calculators</button>
                <button className={styles.faqTab} role="tab" aria-selected="false">Guides &amp; FAQs</button>
              </div>
            </div>

            <div className={styles.faqGrid2}>
              <a className={styles.learnCard} href="#ai-mortgage">
                <h3>How AI Mortgage Lending is Transforming the Home Loan Process</h3>
                <div className={styles.circleArrow} aria-hidden>→</div>
                <p>See how AI is changing approvals, timelines, and access.</p>
                <div className={styles.learnThumb}>
                  <Image src="/ai-mortgage.png" alt="" fill className={styles.coverImg} />
                </div>
              </a>

              <a className={styles.featureCard} href="#one-day-mortgage">
                <h3>One Day Mortgage<span className={styles.sup}>1</span></h3>
                <div className={styles.circleArrow} aria-hidden>→</div>
                <p>
                  Kick your home loan into hyperdrive. Going from locked rate to Commitment Letter takes weeks for traditional lenders. We do it in a single day.
                </p>
                <div className={styles.featureArt}>
                  <Image src="/oneday-mortgage.png" alt="One Day Mortgage" fill className={styles.coverImg} />
                </div>
              </a>
            </div>
          </div>
        </section>

        <section className={styles.services} aria-label="More from Better">
          <div className={styles.servicesInner}>
            <a className={`${styles.serviceCard} ${styles.serviceLeft}`} href="#heloc">
              <div className={styles.serviceMediaLeft}>
                <Image src="/better-heloc.png" alt="Better HELOC" fill className={styles.coverImg} />
              </div>
              <div className={styles.serviceBody}>
                <h3>Better HELOC</h3>
                <div className={styles.circleArrow} aria-hidden>→</div>
                <p>
                  Introducing One Day HELOC—your express lane to getting cash from your home with our Home Equity Line of Credit. Access up to 90% of your home equity as cash in as little as 7 days.
                </p>
              </div>
            </a>

            <a className={`${styles.serviceCard} ${styles.serviceRight}`} href="#insurance">
              <div className={styles.serviceBody}>
                <h3>Insurance</h3>
                <div className={styles.circleArrow} aria-hidden>→</div>
                <div className={styles.serviceMediaBottom}>
                  <Image src="/insurance.png" alt="Insurance" fill className={styles.coverImg} />
                </div>
              </div>
            </a>
          </div>
        </section>
        </main>

        <footer className={styles.siteFooter}>
          <div className={styles.footerInner}>
            <div className={styles.footerCols}>
              <div className={styles.footerCol}>
                <div className={styles.brandSection}>
                  <h3 className={styles.brandName}>Better</h3>
                  <p className={styles.brandDescription}>Better is a family of companies serving all your homeownership needs.</p>
                </div>
                <div className={styles.servicesList}>
                  <div className={styles.serviceItem}>
                    <span className={styles.serviceBrand}>Better</span> <span className={styles.serviceName}>Mortgage</span>
                    <p className={styles.serviceDescription}>We can&apos;t wait to say &quot;Welcome home.&quot; Apply 100% online, with expert customer support.</p>
                  </div>
                  <div className={styles.serviceItem}>
                    <span className={styles.serviceBrand}>Better</span> <span className={styles.serviceName}>Real Estate</span>
                    <p className={styles.serviceDescription}>Find your dream home with a Better Real Estate Agent.</p>
                  </div>
                  <div className={styles.serviceItem}>
                    <span className={styles.serviceBrand}>Better</span> <span className={styles.serviceName}>Cover</span>
                    <p className={styles.serviceDescription}>Get the right coverage for your home and save.</p>
                  </div>
                  <div className={styles.serviceItem}>
                    <span className={styles.serviceBrand}>Better</span> <span className={styles.serviceName}>Inspect</span>
                    <p className={styles.serviceDescription}>Get a thorough home inspection from a trusted expert.</p>
                  </div>
                  <div className={styles.serviceItem}>
                    <span className={styles.serviceBrand}>Better</span> <span className={styles.serviceName}>Settlement Services</span>
                    <p className={styles.serviceDescription}>Close with confidence and ease.</p>
                  </div>
                </div>
              </div>
              
              <div className={styles.footerCol}>
                <h4>Resources</h4>
                <ul>
                  <li><a href="#calculators">Calculators</a></li>
                  <li><a href="#tools">Tools</a></li>
                  <li><a href="#blog">Blog</a></li>
                  <li><a href="#homeowner-resources">Homeowner Resources</a></li>
                  <li><a href="#glossary">Glossary</a></li>
                  <li><a href="#faq">FAQ</a></li>
                  <li><a href="#reviews">Reviews</a></li>
                  <li><a href="#careers">Careers</a></li>
                  <li><a href="#press">Press</a></li>
                  <li><a href="#sitemap">Sitemap</a></li>
                  <li><a href="#accessibility">Accessibility</a></li>
                </ul>
              </div>
              
              <div className={styles.footerCol}>
                <h4>Company</h4>
                <ul>
                  <li><a href="#about-us">About Us</a></li>
                  <li><a href="#contact-us">Contact Us</a></li>
                  <li><a href="#leadership">Leadership</a></li>
                  <li><a href="#our-values">Our Values</a></li>
                  <li><a href="#in-the-news">In the News</a></li>
                  <li><a href="#better-gives">Better Gives</a></li>
                  <li><a href="#better-for-business">Better for Business</a></li>
                </ul>
              </div>
              
              <div className={styles.footerCol}>
                <div className={styles.contactSection}>
                  <h4>Contact Us</h4>
                  <ul>
                    <li><a href="mailto:hello@better.com">hello@better.com</a></li>
                    <li><a href="tel:4155238837">415-523-8837</a></li>
                    <li><a href="#faq">FAQ</a></li>
                    <li><a href="#glossary">Glossary</a></li>
                  </ul>
                </div>
                
                <div className={styles.legalSection}>
                  <h4>Legal</h4>
                  <ul>
                    <li><a href="#privacy-policy">Privacy Policy</a></li>
                    <li><a href="#terms-of-use">Terms of Use</a></li>
                    <li><a href="#licenses">Licenses</a></li>
                    <li><a href="#nmls-consumer-access">NMLS Consumer Access</a></li>
                    <li><a href="#do-not-sell">Do Not Sell My Personal Information</a></li>
                    <li><a href="#ca-privacy-notice">CA Privacy Notice</a></li>
                  </ul>
                </div>
                
                <div className={styles.housingIcons}>
                  <div className={styles.housingIcon}>
                    <Image src="/house-icon.png" alt="" width={130} height={100} className={styles.houseIconImg} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>

        <div className={styles.bottomFooter}>
          <div className={styles.bottomFooterContent}>
            <p className={styles.bottomCopyright}>
              © 2025 Better Home & Finance Holding Company. All rights reserved.
            </p>
            <p className={styles.bottomDisclaimer}>
              Better Mortgage Corporation and its related entities are separate operating subsidiaries of Better Home & Finance Holding Company. Each entity operates independently and is responsible for its own products and services. Product availability may vary by state. Unauthorized use of any proprietary or intellectual property is strictly prohibited. All content, trademarks, service marks, trade names, logos, and other intellectual property displayed on this website are the property of Better Home & Finance Holding Company and/or its affiliates and are protected by federal and state laws. Licensed by the Department of Financial Protection and Innovation under the California Residential Mortgage Lending Act.
            </p>
          </div>
        </div>
                <section className={styles.legalSection}>
          <div className={styles.legalContent}>
            <h2>Better Mortgage&apos;s One Day Mortgage™</h2>
            <p>
              Better Mortgage&apos;s One Day Mortgage™ is a promotion that offers eligible borrowers the opportunity to receive a commitment letter within one business day of rate lock, subject to certain terms and conditions. This promotion is available for conventional, FHA, VA, and USDA loans. The one-day commitment letter is contingent upon the borrower meeting all underwriting requirements, providing all necessary documentation, and the property meeting all appraisal and inspection requirements. Better Mortgage reserves the right to modify or discontinue this promotion at any time without notice.
            </p>

            <h2>Better Mortgage&apos;s One Day HELOC™</h2>
            <p>
              Better Mortgage&apos;s One Day HELOC™ is a promotion that offers eligible borrowers the opportunity to receive a commitment letter within one business day of application, subject to certain terms and conditions. This promotion is available for qualified borrowers with sufficient home equity. The one-day commitment letter is contingent upon the borrower meeting all underwriting requirements, providing all necessary documentation, and the property meeting all appraisal and inspection requirements. Better Mortgage reserves the right to modify or discontinue this promotion at any time without notice.
            </p>

            <p>
              <strong>Borrower Eligibility for AVM:</strong> Automated Valuation Model (AVM) is available for eligible borrowers and properties that meet certain criteria, including but not limited to property type, location, and loan amount. AVM is not available for all properties or loan types. Better Mortgage reserves the right to require a traditional appraisal at any time.
            </p>

            <p>
              <strong>Loan Amount Limits:</strong> Loan amounts are subject to applicable loan limits and borrower qualification criteria. Maximum loan amounts vary by loan type and property location. Contact a Better Mortgage loan officer for specific loan amount limits applicable to your situation.
            </p>

            <p>
              <strong>Document Upload Requirements:</strong> Borrowers must upload all required documentation through the Better Mortgage portal within the specified timeframe. Failure to provide required documentation may result in delays or denial of the loan application. Required documents may include but are not limited to: income verification, asset documentation, employment verification, and property information.
            </p>

            <p>
              <strong>Closing Schedule:</strong> Closing dates are subject to various factors including but not limited to: loan approval, property appraisal completion, title work, and third-party service provider availability. Better Mortgage will work with all parties to schedule closing as quickly as possible, but cannot guarantee specific closing dates.
            </p>

            <p className={styles.copyright}>
              © 2025 Better Home & Finance Holding Company and/or its affiliates.
            </p>

            <h3>Better Entities</h3>
            <p>
              <strong>Better Mortgage Corporation</strong> (NMLS #330511) is a licensed mortgage lender that provides home loans. Better Mortgage Corporation is licensed in all 50 states and the District of Columbia. Better Mortgage Corporation&apos;s main office is located at 1 World Trade Center, 80th Floor, New York, NY 10007.
            </p>

            <p>
              <strong>Better Real Estate, LLC</strong> is a real estate brokerage that provides real estate services through its network of partner brokerages. Better Real Estate, LLC is headquartered at 325-41 Chestnut Street, Suite 826, Philadelphia, PA 19106.
            </p>

            <p>
              <strong>Better Cover, LLC</strong> is an insurance agency that provides insurance products including home, auto, and life insurance. Better Cover, LLC is headquartered at 325-41 Chestnut Street, Suite 807, Philadelphia, PA 19106.
            </p>

            <p>
              <strong>Better Settlement Services, LLC</strong> is a title insurance agency that provides title insurance and settlement services. Better Settlement Services, LLC is headquartered at 325-41 Chestnut Street, Suite 803, Philadelphia, PA 19106.
            </p>

            <p>
              <strong>Better Inspect, LLC</strong> is a home inspection company that provides home inspection services. Better Inspect, LLC is headquartered at 325-41 Chestnut Street, Suite 846, Philadelphia, PA 19106.
            </p>

            <p>
              Better Mortgage Corporation and its related entities are separate operating subsidiaries of Better Home & Finance Holding Company. Each entity operates independently and is responsible for its own products and services.
            </p>

            <p>
              <strong>Proprietary and Intellectual Property:</strong> All content, trademarks, service marks, trade names, logos, and other intellectual property displayed on this website are the property of Better Home & Finance Holding Company and/or its affiliates and are protected by federal and state laws. Unauthorized use of any proprietary or intellectual property is strictly prohibited.
            </p>

            <p>
              <strong>Licensing:</strong> Licensed by the Department of Financial Protection and Innovation under the California Residential Mortgage Lending Act.
            </p>

            <div className={styles.stateNotices}>
              <p><a href="#ny-housing-notice">New York State Housing and Anti-Discrimination Notice</a></p>
              <p><a href="#ny-sop">New York Standard Operating Procedures</a></p>
              <p><a href="#texas-notice">Texas Real Estate Commission: Information About Brokerage Services | Consumer Protection Notice</a></p>
            </div>
          </div>
        </section>
      </div>
    );
  }
