"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";

export default function MortgageCalculator() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Calculator state
  const [homePrice, setHomePrice] = useState(50000);
  const [downPayment, setDownPayment] = useState(10000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [loanTerm, setLoanTerm] = useState(30);
  const [interestRate, setInterestRate] = useState(6.5);
  const [zipCode, setZipCode] = useState("10007");
  const [propertyTaxes, setPropertyTaxes] = useState(0);
  const [homeownersInsurance, setHomeownersInsurance] = useState(0);
  const [hoaFees, setHoaFees] = useState(0);
  const [utilities] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const calculateMonthlyPayment = () => {
    const loanAmount = homePrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    
    if (monthlyRate === 0) {
      return loanAmount / numberOfPayments;
    }
    
    const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                          (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    return monthlyPayment || 0;
  };

  const principalAndInterest = calculateMonthlyPayment();
  const totalMonthlyPayment = principalAndInterest + propertyTaxes + homeownersInsurance + hoaFees + utilities;

  // Update down payment when percentage changes
  useEffect(() => {
    const newDownPayment = Math.round((homePrice * downPaymentPercent) / 100);
    setDownPayment(newDownPayment);
  }, [homePrice, downPaymentPercent]);

  // Update percentage when down payment changes
  useEffect(() => {
    const newPercent = Math.round((downPayment / homePrice) * 100);
    setDownPaymentPercent(newPercent);
  }, [downPayment, homePrice]);

  return (
    <div className={styles.container}>
      <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ""}`}>
        <div className={styles.headerInner}>
          <div className={styles.leftGroup}>
            <Link href="/" aria-label="Better home" className={styles.brand}>
              <Image src="/better-logo.png" alt="Better" width={88} height={28} priority />
            </Link>
            <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`} aria-label="Primary">
              <Link href="/#buy">Buy</Link>
              <Link href="/#refinance">Refinance</Link>
              <Link href="/#heloc">HELOC</Link>
              <Link href="/#rates">Rates</Link>
              <Link href="/#better-plus">Better+</Link>
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
            <h1 className={styles.heroTitle}>Estimate your monthly mortgage payments</h1>
          </div>
        </section>

        <section className={styles.calculatorSection}>
          <div className={styles.calculatorInner}>
            <div className={styles.calculatorLeft}>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Home price</label>
                <div className={styles.inputWrapper}>
                  <span className={styles.currencySymbol}>$</span>
                  <input
                    type="number"
                    value={homePrice}
                    onChange={(e) => setHomePrice(parseInt(e.target.value) || 0)}
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Down payment</label>
                <div className={styles.downPaymentInputs}>
                  <div className={styles.inputWrapper}>
                    <span className={styles.currencySymbol}>$</span>
                    <input
                      type="number"
                      value={downPayment}
                      onChange={(e) => setDownPayment(parseInt(e.target.value) || 0)}
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.inputWrapper}>
                    <input
                      type="number"
                      value={downPaymentPercent}
                      onChange={(e) => setDownPaymentPercent(parseInt(e.target.value) || 0)}
                      className={styles.input}
                    />
                    <span className={styles.percentSymbol}>%</span>
                  </div>
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Length of loan</label>
                <select
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(parseInt(e.target.value))}
                  className={styles.select}
                >
                  <option value={30}>30 years</option>
                  <option value={20}>20 years</option>
                  <option value={15}>15 years</option>
                </select>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Interest rate</label>
                <div className={styles.inputWrapper}>
                  <input
                    type="number"
                    step="0.001"
                    value={interestRate}
                    onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}
                    className={styles.input}
                  />
                  <span className={styles.percentSymbol}>%</span>
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>ZIP code</label>
                <input
                  type="text"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className={styles.input}
                />
              </div>

              <div className={styles.sliderContainer}>
                <input
                  type="range"
                  min="0"
                  max="2000000"
                  value={homePrice}
                  onChange={(e) => {
                    const newHomePrice = parseInt(e.target.value);
                    setHomePrice(newHomePrice);
                    // Update down payment to maintain the same percentage
                    const newDownPayment = Math.round((newHomePrice * downPaymentPercent) / 100);
                    setDownPayment(newDownPayment);
                  }}
                  className={styles.slider}
                />
              </div>
            </div>

            <div className={styles.calculatorRight}>
              <div className={styles.paymentSummary}>
                <h2 className={styles.paymentTitle}>Monthly payment</h2>
                <div className={styles.paymentAmount}>${Math.round(totalMonthlyPayment || 253).toLocaleString()}/mo</div>
                <button className={styles.preApprovalButton}>Get pre-approved</button>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.breakdownSection}>
          <div className={styles.breakdownInner}>
            <h3 className={styles.breakdownTitle}>Monthly payment breakdown</h3>
            
            <div className={styles.breakdownContent}>
              <div className={styles.breakdownLeft}>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill}>100%</div>
                </div>
              </div>
              
              <div className={styles.breakdownRight}>
                <div className={styles.totalPayment}>
                  <div className={styles.totalAmount}>${Math.round(totalMonthlyPayment || 253).toLocaleString()}/mo</div>
                </div>
                
                <div className={styles.breakdownDetails}>
                <div className={styles.breakdownItem}>
                  <div className={styles.breakdownItemBar} style={{backgroundColor: '#2d5a27'}}></div>
                  <div className={styles.breakdownItemLabel}>Principal & interest</div>
                  <div className={styles.breakdownItemValue}>${Math.round(totalMonthlyPayment || 253).toLocaleString()}</div>
                </div>

                <div className={styles.breakdownItem}>
                  <div className={styles.breakdownItemBar} style={{backgroundColor: '#8b5cf6'}}></div>
                  <div className={styles.breakdownItemLabel}>Property taxes</div>
                  <div className={styles.breakdownItemValue}>
                    <input
                      type="number"
                      value={propertyTaxes}
                      onChange={(e) => setPropertyTaxes(parseInt(e.target.value) || 0)}
                      className={styles.breakdownInput}
                    />
                  </div>
                </div>

                <div className={styles.breakdownItem}>
                  <div className={styles.breakdownItemBar} style={{backgroundColor: '#6366f1'}}></div>
                  <div className={styles.breakdownItemLabel}>Homeowners insurance</div>
                  <div className={styles.breakdownItemValue}>
                    <input
                      type="number"
                      value={homeownersInsurance}
                      onChange={(e) => setHomeownersInsurance(parseInt(e.target.value) || 0)}
                      className={styles.breakdownInput}
                    />
                  </div>
                </div>

                <div className={styles.breakdownItem}>
                  <div className={styles.breakdownItemBar} style={{backgroundColor: '#f59e0b'}}></div>
                  <div className={styles.breakdownItemLabel}>HOA fees</div>
                  <div className={styles.breakdownItemValue}>
                    <input
                      type="number"
                      value={hoaFees}
                      onChange={(e) => setHoaFees(parseInt(e.target.value) || 0)}
                      className={styles.breakdownInput}
                    />
                  </div>
                </div>

                <div className={styles.breakdownItem}>
                  <div className={styles.breakdownItemBar} style={{backgroundColor: '#ef4444'}}></div>
                  <div className={styles.breakdownItemLabel}>Utilities</div>
                  <div className={styles.breakdownItemValue}>
                    <span>${utilities.toLocaleString()}/mo</span>
                    <span className={styles.dropdownArrow}>▼</span>
                  </div>
                </div>
              </div>

              <button className={styles.copyButton}>Copy estimate link</button>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.stepsSection}>
          <div className={styles.stepsInner}>
            <h2 className={styles.stepsTitle}>Simple steps to get pre-approved</h2>
            
            <div className={styles.stepsGrid}>
              <div className={styles.stepItem}>
                <div className={styles.stepNumber}>1</div>
                <h3 className={styles.stepTitle}>Share a few details</h3>
                <p className={styles.stepDescription}>
                  Tell us about your income, credit, and home goals—it takes as little as 3 minutes and won&apos;t affect your credit score.
                </p>
              </div>

              <div className={styles.stepItem}>
                <div className={styles.stepNumber}>2</div>
                <h3 className={styles.stepTitle}>See your homebuying budget</h3>
                <p className={styles.stepDescription}>
                  In minutes, we&apos;ll show you exactly how much you can get pre-approved for—so you know your price range before you shop.
                </p>
              </div>

              <div className={styles.stepItem}>
                <div className={styles.stepNumber}>3</div>
                <h3 className={styles.stepTitle}>Get your pre-approval letter</h3>
                <p className={styles.stepDescription}>
                  Download your letter instantly and start touring homes with confidence (and a stronger offer in hand).
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.ctaSection}>
          <div className={styles.ctaInner}>
            <h2 className={styles.ctaTitle}>Check your homebuying power</h2>
            <button className={styles.ctaButton}>See what I qualify for</button>
            <p className={styles.ctaDescription}>...in as little as 3 minutes – no credit impact</p>
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
                  <p className={styles.serviceDescription}>Connect with a local Better Real Estate Partner Agent to find out all the ways you can save.</p>
                </div>
                <div className={styles.serviceItem}>
                  <span className={styles.serviceBrand}>Better</span> <span className={styles.serviceName}>Cover</span>
                  <p className={styles.serviceDescription}>Shop, bundle, and save on insurance coverage for home, auto, life, and more.</p>
                </div>
                <div className={styles.serviceItem}>
                  <span className={styles.serviceBrand}>Better</span> <span className={styles.serviceName}>Inspect</span>
                  <p className={styles.serviceDescription}>Get free repair estimates, 24-hour turnarounds on reports, and rest easy with our 100-day inspection guarantee.</p>
                </div>
                <div className={styles.serviceItem}>
                  <span className={styles.serviceBrand}>Better</span> <span className={styles.serviceName}>Settlement Services</span>
                  <p className={styles.serviceDescription}>Get transparent rates when you shop for title insurance all in one convenient place.</p>
                </div>
              </div>
            </div>
            
            <div className={styles.footerCol}>
              <h4>Resources</h4>
              <ul>
                <li><a href="#home-affordability-calculator">Home affordability calculator</a></li>
                <li><a href="#mortgage-calculator">Mortgage calculator</a></li>
                <li><a href="#free-mortgage-calculator">Free mortgage calculator</a></li>
                <li><a href="#mortgage-calculator-taxes">Mortgage calculator with taxes</a></li>
                <li><a href="#mortgage-calculator-pmi">Mortgage calculator with PMI</a></li>
                <li><a href="#rent-vs-buy-calculator">Rent vs buy calculator</a></li>
                <li><a href="#heloc-payment-calculator">HELOC payment calculator</a></li>
                <li><a href="#heloc-vs-cashout-calculator">HELOC vs cash-out refinance calculator</a></li>
                <li><a href="#buy-a-home">Buy a home</a></li>
                <li><a href="#sell-a-home">Sell a home</a></li>
                <li><a href="#get-home-inspection">Get home inspection</a></li>
              </ul>
            </div>
            
            <div className={styles.footerCol}>
              <h4>Company</h4>
              <ul>
                <li><a href="/about-us">About Us</a></li>
                <li><a href="#careers">Careers</a></li>
                <li><a href="#media">Media</a></li>
                <li><a href="#partner-with-us">Partner With Us</a></li>
                <li><a href="#learning-center">Learning center</a></li>
                <li><a href="#faqs">FAQs</a></li>
                <li><a href="#investor-relations">Investor Relations</a></li>
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
                  <li><a href="#nmls-consumer-access">NMLS Consumer Access</a></li>
                  <li><a href="#privacy-policy">Privacy Policy</a></li>
                  <li><a href="#terms-of-use">Terms of Use</a></li>
                  <li><a href="#disclosures-licensing">Disclosures & Licensing</a></li>
                  <li><a href="#affiliated-business">Affiliated Business</a></li>
                  <li><a href="#browser-disclaimer">Browser Disclaimer</a></li>
                </ul>
                <div className={styles.housingIcon}>
                  <Image src="/house-icon.png" alt="" width={160} height={65} className={styles.houseIconImg} />
                  <span className={styles.housingText}>EQUAL HOUSING OPPORTUNITY</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.legalSection}>
          <div className={styles.legalInner}>
            <div className={styles.socialIcons}>
              <a href="#" className={styles.socialIcon} aria-label="Facebook">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className={styles.socialIcon} aria-label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className={styles.socialIcon} aria-label="LinkedIn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>

            <div className={styles.legalContent}>
              <p className={styles.copyright}>
                © 2025 Better Home & Finance Holding Company and/or its affiliates. Better is a family of companies serving all your homeownership needs. Better Mortgage Corporation provides home loans. Better Real Estate, LLC and Better Real Estate California Inc License # 02164055 provides real estate services. Better Cover, LLC sells insurance products. Better Settlement Services provides title insurance services. Better Inspect, LLC provides home inspection services. All rights reserved.
              </p>

              <p className={styles.companyDetails}>
                Better BMC operates under the name Better Mortgage Corporation in New York. Home lending products offered by Better Mortgage Corporation. Better Mortgage Corporation is a direct lender. NMLS #330511. 1 World Trade Center, 80th Floor, New York, NY 10007. Loans are made or arranged pursuant to a California Finance Lenders Law License. Not available in all states. Equal Housing Lender. <a href="#nmls-consumer-access">NMLS Consumer Access</a>.
              </p>

              <p className={styles.realEstateDetails}>
                Better Real Estate, LLC dba BRE, Better Home Services, BRE Services, LLC and Better Real Estate, operates in California through Better Real Estate California Inc. Better Real Estate, LLC is a licensed real estate brokerage. Corporate headquarters: 325-41 Chestnut Street, Suite 826, Philadelphia, PA 19106. <a href="#license-numbers">Better Real Estate, LLC&apos;s license numbers</a>. Access to brokerage services is provided through a nationwide network of partner brokerages and real estate agents (&quot;Better Real Estate Partner Agents&quot;). Equal Housing Opportunity. All rights reserved.
              </p>

              <div className={styles.stateNotices}>
                <a href="#ny-housing-notice">New York State Housing and Anti-Discrimination Notice</a>
                <a href="#ny-sop">New York Standard Operating Procedures</a>
                <a href="#texas-notice">Texas Real Estate Commission: Information About Brokerage Services | Consumer Protection Notice</a>
              </div>

              <div className={styles.entityAddresses}>
                <p>Better Settlement Services, LLC. 325-41 Chestnut Street, Suite 803, Philadelphia, PA 19106.</p>
                <p>Homeowners insurance policies are offered through Better Cover, LLC, a Pennsylvania Resident Producer Agency. License #881593. 325-41 Chestnut Street, Suite 807, Philadelphia, PA 19106.</p>
                <p>Insurance quotes and policies are offered through Better Cover, LLC. A Pennsylvania Resident Producer Agency. License #881593. <a href="#cover-license-numbers">Here is a full listing of Better Cover, LLC&apos;s license numbers</a>.</p>
                <p>Better Inspect, LLC maintains its corporate headquarters at 325-41 Chestnut Street, Suite 846, Philadelphia, PA 19106.</p>
              </div>

              <p className={styles.companyStructure}>
                Better Mortgage Corporation, Better Real Estate, LLC, Better Settlement Services, LLC, Better Cover, LLC, Better Connect, and Better Inspect, LLC are separate operating subsidiaries of Better Home & Finance Holding Company. Each company is a separate legal entity operated and managed through its own management and governance structure as required by its state of incorporation, and applicable and legal and regulatory requirements. Products not available in all states.
              </p>

              <p className={styles.intellectualProperty}>
                Unauthorized use of any proprietary or intellectual property is strictly prohibited. All trademarks, service marks, trade names, logos, icons, and domain names are proprietary to Better Home & Finance Holding Company. Better Home & Finance Holding Company trademarks are federally registered with the U. S. Patent and Trademark Office. Better Cover is a registered trademark with the U.S. Patent and Trademark Office and is owned by Better Cover, LLC.
              </p>

              <p className={styles.californiaLicense}>
                Licensed by the Department of Financial Protection and Innovation under the California Residential Mortgage Lending Act
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
