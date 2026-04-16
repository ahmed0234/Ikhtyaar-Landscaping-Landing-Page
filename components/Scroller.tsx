"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionTemplate, useSpring } from "framer-motion";
import styles from "./FinalCTASection.module.css";

const COMPANIES = [
  "/companies/Ridgewell Colorado logo.png",
  "/companies/Swisher Capital Logo.png",
  "/companies/blu dental.png",
  "/companies/bright smile dental.png",
  "/companies/daio.png",
  "/companies/wellrite.jpg",
  "/companies/Hiscox.png",
  "/companies/Pristine Clean.png",
  "/companies/Casey Insurance.jpg",
  "/companies/SINY Dermatology.png",
];

const BIG_LOGOS = [
  "/companies/Hiscox.png",
  "/companies/Pristine Clean.png",
  "/companies/Casey Insurance.jpg",
  "/companies/SINY Dermatology.png",
];

const Scroller = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const containerRef = useRef<HTMLDivElement>(null);

  const springX = useSpring(0, { stiffness: 50, damping: 20 });
  const springY = useSpring(0, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top } = containerRef.current.getBoundingClientRect();
    springX.set(e.clientX - left);
    springY.set(e.clientY - top);
  };

  const spotlightBg = useMotionTemplate`radial-gradient(circle 800px at ${springX}px ${springY}px, rgba(37, 99, 235, 0.08), transparent 50%)`;

  return (
    <div
      className={styles.trustedBySection}
      ref={containerRef}
      onMouseMove={handleMouseMove}
    >
      {mounted && (
        <motion.div
          className={styles.scrollerInteractiveBg}
          style={{ background: spotlightBg }}
        />
      )}
      <p className={styles.trustedByLabel}>
        COMPANIES THAT TRUST US WITH THEIR GROWTH
      </p>
      <div className={styles.marqueeContainer}>
        <div className={styles.marqueeGroup}>
          {COMPANIES.map((src, idx) => {
            const isBig = BIG_LOGOS.includes(src);
            return (
              <div key={`group1-${idx}`} className={styles.marqueeLogoWrapper}>
                <img
                  src={src}
                  alt="Trusted Company"
                  className={styles.marqueeLogo}
                  style={isBig ? { width: "162%", height: "162%" } : {}}
                />
              </div>
            );
          })}
        </div>
        <div className={styles.marqueeGroup} aria-hidden="true">
          {COMPANIES.map((src, idx) => {
            const isBig = BIG_LOGOS.includes(src);
            return (
              <div key={`group2-${idx}`} className={styles.marqueeLogoWrapper}>
                <img
                  src={src}
                  alt="Trusted Company"
                  className={styles.marqueeLogo}
                  style={isBig ? { width: "220%", height: "220%" } : {}}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Scroller;
