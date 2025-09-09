"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";

export default function StartPage() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            <h1 className={styles.brandName}>Better</h1>
            <span className={styles.brandSubtitle}>Mortgage</span>
          </div>
          <div className={styles.centerIcon}>
            <Image 
              src="/navbar-icon.png" 
              alt="Better Mortgage" 
              width={40} 
              height={40}
              className={styles.navbarIcon}
            />
          </div>
          <div className={styles.contactInfo}>
            <div className={styles.phoneIcon}>📞</div>
            <span className={styles.phoneText}>Need help? Call 415-523-8837</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.main}>
        <div className={styles.contentWrapper}>

          {/* Greeting */}
          <div className={styles.greeting}>
            <h2 className={styles.greetingTitle}>Hi, I&apos;m Betsy!</h2>
            <p className={styles.greetingSubtitle}>What can I help you with?</p>
          </div>

          {/* Action Options */}
          <div className={styles.optionsContainer}>
            <button 
              className={`${styles.optionButton} ${selectedOption === 'buying' ? styles.selected : ''}`}
              onClick={() => handleOptionClick('buying')}
            >
              <div className={styles.optionIcon}>
                <Image 
                  src="/buying-home-icon.png" 
                  alt="Buying a home" 
                  width={40} 
                  height={40}
                  className={styles.optionImage}
                />
              </div>
              <span className={styles.optionText}>Buying a home</span>
            </button>

            <button 
              className={`${styles.optionButton} ${selectedOption === 'refinancing' ? styles.selected : ''}`}
              onClick={() => handleOptionClick('refinancing')}
            >
              <div className={styles.optionIcon}>
                <Image 
                  src="/refinancing-icon.png" 
                  alt="Refinancing my mortgage" 
                  width={40} 
                  height={40}
                  className={styles.optionImage}
                />
              </div>
              <span className={styles.optionText}>Refinancing my mortgage</span>
            </button>

            <button 
              className={`${styles.optionButton} ${selectedOption === 'cash' ? styles.selected : ''}`}
              onClick={() => handleOptionClick('cash')}
            >
              <div className={styles.optionIcon}>
                <Image 
                  src="/cash-from-home-icon.png" 
                  alt="Get cash from my home" 
                  width={40} 
                  height={40}
                  className={styles.optionImage}
                />
              </div>
              <span className={styles.optionText}>Get cash from my home</span>
            </button>
          </div>

          {/* Statistics */}
          <div className={styles.statsContainer}>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>$100B</div>
              <div className={styles.statDescription}>home loans funded entirely online</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>400K</div>
              <div className={styles.statDescription}>Customers who chose a Better Mortgage</div>
            </div>
          </div>

          {/* Unlock Feature Box */}
          <div className={styles.unlockBox}>
            <Image
              src="/unlock-feature.png"
              alt="After a few questions, you'll unlock: Custom mortgage rates, Exclusive offers, A personalized dashboard"
              width={600}
              height={200}
              className={styles.unlockImage}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerColumn}>
            <h4 className={styles.footerTitle}>Better</h4>
            <p className={styles.footerDescription}>
              Better Mortgage Corporation is a direct lender dedicated to providing a fast, transparent digital mortgage experience backed by superior customer support.
            </p>
          </div>
          
          <div className={styles.footerColumn}>
            <h4 className={styles.footerTitle}>Contact Us</h4>
            <div className={styles.footerLinks}>
              <a href="#" className={styles.footerLink}>Schedule a conversation</a>
              <a href="mailto:hello@better.com" className={styles.footerLink}>hello@better.com</a>
              <a href="tel:415-523-8837" className={styles.footerLink}>415-523-8837</a>
              <a href="#" className={styles.footerLink}>FAQ</a>
              <a href="#" className={styles.footerLink}>Resources</a>
            </div>
          </div>
          
          <div className={styles.footerColumn}>
            <h4 className={styles.footerTitle}>Legal</h4>
            <div className={styles.footerLinks}>
              <a href="#" className={styles.footerLink}>NMLS Consumer Access</a>
              <a href="#" className={styles.footerLink}>Privacy Policy</a>
              <a href="#" className={styles.footerLink}>Terms of Use</a>
              <a href="#" className={styles.footerLink}>Disclosures & Licensing</a>
              <a href="#" className={styles.footerLink}>Affiliated Business</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
