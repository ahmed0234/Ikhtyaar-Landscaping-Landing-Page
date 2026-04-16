"use client";

import React, { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  AnimatePresence,
} from "framer-motion";
import styles from "./page.module.css";
import Testimonials from "../components/Testimonials";
import ProblemSection from "../components/ProblemSection";
import SolutionSection from "../components/SolutionSection";
import FinalCTASection from "../components/FinalCTASection";
import Scroller from "@/components/Scroller";

const heroSplitChild = {
  hidden: { opacity: 0, y: 30, rotateX: -90, transformPerspective: 600 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { type: "spring", damping: 14, stiffness: 200 },
  },
};

const SplitText = ({ children }: { children: any }) => {
  const childrenString = Array.isArray(children)
    ? children.join("")
    : typeof children === "string"
      ? children
      : "";
  const parts = childrenString.match(/\S+|\s+/g) || [];
  let charIndex = 0;
  return (
    <>
      {parts.map((part, i) => {
        if (/\s+/.test(part)) {
          return (
            <span key={`space-${i}`} style={{ display: "inline" }}>
              {part}
            </span>
          );
        }
        return (
          <span
            key={`word-${i}`}
            style={{ display: "inline-block", whiteSpace: "nowrap" }}
          >
            {part.split("").map((char) => {
              const currentKey = charIndex;
              charIndex++;
              return (
                <motion.span
                  key={currentKey}
                  variants={heroSplitChild}
                  style={{ display: "inline-block" }}
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
        );
      })}
    </>
  );
};

const heroSubtextWord = {
  hidden: { opacity: 0, y: 15, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const SplitSubtext = ({ text }: { text: string }) => {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <span key={i} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
          <motion.span
            variants={heroSubtextWord}
            style={{ display: "inline-block" }}
          >
            {word}
          </motion.span>
          {i !== words.length - 1 && (
            <span style={{ display: "inline" }}>&nbsp;</span>
          )}
        </span>
      ))}
    </>
  );
};

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the mouse movements
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    setMounted(true);
    // Center it initially
    mouseX.set(typeof window !== "undefined" ? window.innerWidth / 2 : 500);
    mouseY.set(typeof window !== "undefined" ? window.innerHeight / 2 : 500);
  }, [mouseX, mouseY]);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // Creates the spotlight mask for the grid
  const maskImage = useMotionTemplate`radial-gradient(circle 800px at ${springX}px ${springY}px, black, transparent 80%)`;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };

  const headlineVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
        delayChildren: 0.2,
      },
    },
  };

  const subtextVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 1.2,
      },
    },
  };

  return (
    <>
      <div className={styles.heroContainer} onMouseMove={handleMouseMove}>
        {/* Background Animated Blobs for Glassmorphism Context */}
        <div className={styles.blobBlue}></div>
        <div className={styles.blobOrange}></div>
        <div className={styles.blobBlue}></div>

        {/* Infinite Flowing Grid masked with mouse position */}
        {mounted && (
          <motion.div
            className={styles.gridContainer}
            style={{ maskImage, WebkitMaskImage: maskImage }}
          >
            <div className={styles.gridLines}></div>
          </motion.div>
        )}

        {/* Navigation Layer */}
        <motion.header
          className={`${styles.header}  h-28`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className={styles.logo}>
            <a
              href="https://ikhtiyaar.com/"
              target="_blank"
              className={styles.logoWrapper}
            >
              <img
                src="/logos/navlogo.png"
                alt="Ikhtyaar"
                className={styles.navLogo}
              />
            </a>
          </div>

          <div className={styles.growthSignal}>
            <div className={styles.signalShimmer}></div>
            <div className={styles.wavePreview}>
              <svg viewBox="0 0 60 20" fill="none">
                <path
                  d="M2 15C10 15 15 5 25 5C35 5 40 15 50 15C55 15 58 10 58 10"
                  className={styles.wavePath}
                />
              </svg>
            </div>
            <div className={styles.signalData}>
              <span className={styles.signalTitle}>Performance Flow</span>
              <span className={styles.signalMetric}>
                ROI <span>+42% Average</span>
              </span>
            </div>
          </div>

          <div className={styles.phoneWidget}>
            <div className={styles.phoneIconWrapper}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.27-2.26a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <div className={styles.phoneDetails}>
              <span className={styles.phoneLabel}>Call now</span>
              <a href="tel:2513856294" className={styles.phoneNumber}>
                (251) 385-6294
              </a>
            </div>
            <div className={styles.phoneGlow} />
          </div>
        </motion.header>

        {/* Hover/Floating Scene Elements */}
        {mounted && (
          <>
            {/* Google Ads Performance Card */}
            <motion.div
              className={`${styles.floatingElement} ${styles.adsCard}`}
              initial={{ x: -100, y: 150, opacity: 0 }}
              animate={{ x: 0, y: [150, 130, 150], opacity: 1 }}
              transition={{
                x: { type: "spring", stiffness: 50 },
                y: { repeat: Infinity, duration: 6, ease: "easeInOut" },
                opacity: { duration: 1 },
              }}
              style={{ top: "15%", left: "5%" }}
            >
              <div className={styles.adsHeader}>
                <div className={styles.adsIcon}>
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="20" x2="12" y2="10"></line>
                    <line x1="18" y1="20" x2="18" y2="4"></line>
                    <line x1="6" y1="20" x2="6" y2="16"></line>
                  </svg>
                </div>
                <div className={styles.adsTitleContainer}>
                  <span className={styles.adsTitle}>Landscaping Ads</span>
                  <div className={styles.adsStatus}>
                    <div className={styles.adsStatusDot}></div> Active Campaign
                  </div>
                </div>
              </div>
              <div className={styles.adsStats}>
                <div className={styles.adsStatItem}>
                  <span className={styles.adsStatLabel}>ROAS</span>
                  <span
                    className={`${styles.adsStatValue} ${styles.adsStatValueHighlight}`}
                  >
                    +320%
                  </span>
                </div>
                <div className={styles.adsStatItem}>
                  <span className={styles.adsStatLabel}>CPA</span>
                  <span className={styles.adsStatValue}>$12.50</span>
                </div>
              </div>
            </motion.div>

            {/* Growth Chart Card */}
            <motion.div
              className={`${styles.floatingElement} ${styles.growthCard}`}
              initial={{ x: 100, y: 180, opacity: 0 }}
              animate={{ x: 0, y: [180, 200, 180], opacity: 1 }}
              transition={{
                x: { type: "spring", stiffness: 50 },
                y: {
                  repeat: Infinity,
                  duration: 5,
                  ease: "easeInOut",
                  delay: 1,
                },
                opacity: { duration: 1 },
              }}
              style={{ top: "25%", right: "6%" }}
            >
              <div className={styles.growthBarContainer}>
                <div
                  className={`${styles.growthBar} ${styles.growthBar1}`}
                ></div>
                <div
                  className={`${styles.growthBar} ${styles.growthBar2}`}
                ></div>
                <div
                  className={`${styles.growthBar} ${styles.growthBar3}`}
                ></div>
                <div
                  className={`${styles.growthBar} ${styles.growthBar4}`}
                ></div>
              </div>
              <div className={styles.growthTextContainer}>
                <span className={styles.growthValue}>+450%</span>
                <span className={styles.growthLabel}>Traffic</span>
              </div>
            </motion.div>

            {/* Client Booked Card */}
            <motion.div
              className={`${styles.floatingElement} ${styles.clientCard}`}
              initial={{ x: -80, y: 550, opacity: 0 }}
              animate={{ x: 0, y: [550, 530, 550], opacity: 1 }}
              transition={{
                x: { type: "spring", stiffness: 40 },
                y: {
                  repeat: Infinity,
                  duration: 5.5,
                  ease: "easeInOut",
                  delay: 0.5,
                },
                opacity: { duration: 1 },
              }}
              style={{ top: "65%", left: "4%" }}
            >
              <div className={styles.clientAvatar}>JD</div>
              <div className={styles.clientInfo}>
                <span className={styles.clientName}>John Doe</span>
                <span className={styles.clientAction}>Booked a Call 📞</span>
              </div>
            </motion.div>

            {/* Lead Notification Card */}
            <motion.div
              className={`${styles.floatingElement} ${styles.clientCard}`}
              initial={{ x: 80, y: 600, opacity: 0 }}
              animate={{ x: 0, y: [600, 580, 600], opacity: 1 }}
              transition={{
                x: { type: "spring", stiffness: 45 },
                y: {
                  repeat: Infinity,
                  duration: 4.5,
                  ease: "easeInOut",
                  delay: 1.2,
                },
                opacity: { duration: 1 },
              }}
              style={{ top: "70%", right: "4%" }}
            >
              <div
                className={styles.clientAvatar}
                style={{
                  background: "linear-gradient(135deg, #10B981, #3B82F6)",
                }}
              >
                SJ
              </div>
              <div className={styles.clientInfo}>
                <span className={styles.clientName}>Sarah Jenkins</span>
                <span className={styles.clientAction}>
                  New High-Intent Lead ✨
                </span>
              </div>
            </motion.div>
          </>
        )}

        {/* Main Content Area */}
        <main className={styles.content}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={styles.textColumn}
          >
            <motion.div
              variants={itemVariants}
              className={styles.badgeContainer}
            >
              <div className={styles.glassBadge}>
                <span className={styles.badgePulse}></span>
                <span className={styles.badgeText}>
                  Get 10-20 Quotes Right Now
                </span>
              </div>
            </motion.div>

            <motion.h1 variants={headlineVariants} className={styles.headline}>
              <SplitText>
                People Are Searching For Landscaping In Your Area Every Day,{" "}
              </SplitText>
              <br className={styles.breakIfDesktop} />
              <motion.span
                className={styles.highlightWrapper}
                variants={heroSplitChild}
              >
                <span className={styles.highlightText}>
                  <SplitText>The Only Question is</SplitText>
                </span>
                <svg
                  className={styles.highlightUnderlineShape}
                  viewBox="0 0 400 30"
                  preserveAspectRatio="none"
                >
                  <motion.path
                    d="M5 25 Q 200 -5 395 25"
                    stroke="rgba(37, 99, 235, 0.4)"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                      duration: 1.5,
                      delay: 1.2,
                      ease: "easeInOut",
                    }}
                  />
                </svg>
              </motion.span>
              <SplitText> Do They See You?</SplitText>
            </motion.h1>
            {/* 
            <motion.p variants={subtextVariants} className={styles.subtext}>
              <SplitSubtext text="Watch this short video to see how we help insurance agencies show up on Google and turn those searches into booked calls automatically." />
            </motion.p> */}

            {/* Interactive Section (Video + Calendar) */}
            <div className={styles.interactiveSection}>
              {/* Left Column: Video + Benefits */}
              <div className={styles.leftColumnWrapper}>
                {/* Video Mockup Area */}
                <motion.div
                  className={styles.videoMockup}
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 80,
                    damping: 20,
                    delay: 0.6,
                  }}
                >
                  <motion.div
                    className={styles.glassVideoCard}
                    whileHover={{ y: -10 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    onClick={() => setIsVideoModalOpen(true)}
                  >
                    <div className={styles.glassShine}></div>

                    <video
                      src="/James.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      className={styles.videoPreview}
                    />

                    <div className={styles.playInteractionLayer}>
                      <motion.div
                        className={styles.playCircleOuter}
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{
                          repeat: Infinity,
                          duration: 3,
                          ease: "easeInOut",
                        }}
                      >
                        <div className={styles.playCircleGlow}></div>
                        <div className={styles.playButtonLarge}>
                          <svg
                            width="36"
                            height="36"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <polygon points="8 5 19 12 8 19 8 5"></polygon>
                          </svg>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Floating Tags for visual flair using Glassmorphism */}
                  <motion.div
                    className={styles.floatingTag}
                    style={{ top: "10%", left: "-6%" }}
                    animate={{ y: [-5, 5, -5] }}
                    transition={{
                      repeat: Infinity,
                      duration: 4,
                      ease: "easeInOut",
                    }}
                  >
                    <div className={styles.tagIconGreen}>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <span className={styles.tagText}>+340% Traffic</span>
                  </motion.div>

                  <motion.div
                    className={styles.floatingTag}
                    style={{ bottom: "15%", right: "-6%" }}
                    animate={{ y: [5, -5, 5] }}
                    transition={{
                      repeat: Infinity,
                      duration: 5,
                      ease: "easeInOut",
                      delay: 1,
                    }}
                  >
                    <div className={styles.tagIconBlue}>⚡</div>
                    <span className={styles.tagText}>High Intent Leads</span>
                  </motion.div>

                  {/* Animated Pointer Arrows - Left */}
                  <motion.div
                    className={`${styles.pointerArrow} ${styles.pointerLeft}`}
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{
                      opacity: [0.7, 1, 0.7],
                      y: [-8, 8, -8],
                    }}
                    viewport={{ once: false }}
                    transition={{
                      duration: 4.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{
                      left: "-120px",
                      top: "-200px",
                      width: "240px",
                      height: "280px",
                    }}
                  >
                    <svg
                      width="100%"
                      height="100%"
                      viewBox="0 0 240 280"
                      fill="none"
                      overflow="visible"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <linearGradient
                          id="flowGradLeft"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop offset="0%" stopColor="rgba(37,99,235,0)" />
                          <stop offset="100%" stopColor="#2563EB" />
                        </linearGradient>
                      </defs>

                      {/* Faint ambient track */}
                      <path
                        d="M 40 40 C 180 40, 200 150, 210 240"
                        stroke="#2563EB"
                        strokeWidth="2"
                        opacity="0.15"
                        strokeLinecap="round"
                        fill="none"
                      />

                      {/* Breathing organic tail that expands/contracts, anchored at tip */}
                      <motion.path
                        d="M 40 40 C 180 40, 200 150, 210 240"
                        stroke="url(#flowGradLeft)"
                        strokeWidth="5"
                        strokeLinecap="round"
                        fill="none"
                        initial={{ pathLength: 0.1 }}
                        animate={{
                          pathLength: [0.1, 1, 0.1],
                          opacity: [1, 0.5, 1],
                        }}
                        transition={{
                          duration: 3.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />

                      {/* Directional energy core dashed flow */}
                      <motion.path
                        d="M 40 40 C 180 40, 200 150, 210 240"
                        stroke="#3B82F6"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        fill="none"
                        strokeDasharray="6 26"
                        initial={{ strokeDashoffset: 0 }}
                        animate={{ strokeDashoffset: -128 }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        opacity="0.9"
                      />

                      {/* Floating Arrow Head */}
                      <motion.path
                        d="M 192 202 L 210 240 L 220 199"
                        stroke="#2563EB"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        animate={{
                          x: [-2, 3, -2],
                          y: [-2, 3, -2],
                          scale: [0.95, 1.05, 0.95],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    </svg>
                  </motion.div>

                  {/* Animated Pointer Arrows - Right */}
                  <motion.div
                    className={`${styles.pointerArrow} ${styles.pointerRight}`}
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{
                      opacity: [0.7, 1, 0.7],
                      y: [8, -8, 8],
                    }}
                    viewport={{ once: false }}
                    transition={{
                      duration: 5.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5,
                    }}
                    style={{
                      right: "-90px",
                      top: "-100px",
                      width: "240px",
                      height: "180px",
                    }}
                  >
                    <svg
                      width="100%"
                      height="100%"
                      viewBox="0 0 240 280"
                      fill="none"
                      overflow="visible"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <linearGradient
                          id="flowGradRight"
                          x1="100%"
                          y1="0%"
                          x2="0%"
                          y2="100%"
                        >
                          <stop offset="0%" stopColor="rgba(16,185,129,0)" />
                          <stop offset="100%" stopColor="#10B981" />
                        </linearGradient>
                      </defs>

                      {/* Faint ambient track - Green for variety since the tag is Blue/Green */}
                      <path
                        d="M 200 40 C 60 40, 40 150, 30 240"
                        stroke="#0095ff"
                        strokeWidth="2"
                        opacity="0.15"
                        strokeLinecap="round"
                        fill="none"
                      />

                      {/* Breathing organic tail */}
                      <motion.path
                        d="M 200 40 C 60 40, 40 150, 30 240"
                        stroke="#0095ff"
                        strokeWidth="5"
                        strokeLinecap="round"
                        fill="none"
                        initial={{ pathLength: 0.15 }}
                        animate={{
                          pathLength: [0.15, 1, 0.15],
                          opacity: [1, 0.5, 1],
                        }}
                        transition={{
                          duration: 4.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 0.5,
                        }}
                      />

                      {/* Directional energy core dashed flow */}
                      <motion.path
                        d="M 200 40 C 60 40, 40 150, 30 240"
                        stroke="#2878ed"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        fill="none"
                        strokeDasharray="6 26"
                        initial={{ strokeDashoffset: 0 }}
                        animate={{ strokeDashoffset: -128 }}
                        transition={{
                          duration: 1.8,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        opacity="0.9"
                      />

                      {/* Floating Arrow Head */}
                      <motion.path
                        d="M 48 202 L 30 240 L 20 199"
                        stroke="#0095ff"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        animate={{
                          x: [2, -3, 2],
                          y: [-2, 3, -2],
                          scale: [0.95, 1.05, 0.95],
                        }}
                        transition={{
                          duration: 2.2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 0.2,
                        }}
                      />
                    </svg>
                  </motion.div>
                </motion.div>

                {/* Benefits Section */}
                <motion.div
                  className={styles.videoBenefits}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, type: "spring", stiffness: 80 }}
                >
                  <h4 className={styles.videoBenefitsHeader}>
                    What you'll get on this call:
                  </h4>
                  <p className={styles.videoBenefitsSub}>
                    A custom blueprint to dominate search results.
                  </p>

                  <div className={styles.benefitItemsGrid}>
                    <div className={styles.benefitItem}>
                      <svg
                        className={styles.benefitIcon}
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                      <span>How landscaping companies are getting inbound jobs from Google daily</span>
                    </div>
                    <div className={styles.benefitItem}>
                      <svg
                        className={styles.benefitIcon}
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                      <span>Exact search volumes in your area</span>
                    </div>
                    <div className={styles.benefitItem}>
                      <svg
                        className={styles.benefitIcon}
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                      <span>Why most ads don’t work (and where money gets wasted)</span>
                    </div>
                    <div className={styles.benefitItem}>
                      <svg
                        className={styles.benefitIcon}
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                      <span>Review of your competitors' ads</span>
                    </div>
                  </div>
                </motion.div>

                {/* Trust Indicators */}
                <motion.div
                  className={styles.trustIndicators}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, type: "spring", stiffness: 80 }}
                >
                  <div className={styles.trustAvatars}>
                    <img src="/Clients/7.png" alt="Client" />
                    <img src="/Clients/6.png" alt="Client" />
                    <img src="/Clients/5.jpeg" alt="Client" />
                    <div className={styles.trustAvatarsMore}>+80</div>
                  </div>
                  <div className={styles.trustText}>
                    <div className={styles.trustStars}>★★★★★</div>
                    <span>Trusted by 80+ growing landscaping companies</span>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className={styles.ctaGroup}>
                  <a
                    href="https://zcal.co/ikhtiyaar/discoverycall"
                    target="_blank"
                  >
                    <motion.button
                      className={styles.primaryCta}
                      initial="idle"
                      whileHover="hover"
                      whileTap="tap"
                      variants={{
                        idle: {
                          scale: 1,
                          boxShadow:
                            "0px 10px 30px -5px rgba(37, 99, 235, 0.4)",
                        },
                        hover: {
                          scale: 1.05,
                          boxShadow:
                            "0px 30px 60px -12px rgba(37, 99, 235, 0.6), inset 0px 1px 1px rgba(255,255,255,0.8)",
                        },
                        tap: { scale: 0.96 },
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                      }}
                    >
                      {/* Continuous Glass Shimmer (Idle Life) */}
                      <motion.div
                        className={styles.ctaContinuousShimmer}
                        animate={{
                          x: ["-100%", "100%"],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />

                      {/* Glass Morph Backdrop (Hover State) */}
                      <motion.div
                        className={styles.buttonGlassBackdrop}
                        variants={{
                          idle: { opacity: 0, scale: 0.95 },
                          hover: { opacity: 1, scale: 1 },
                        }}
                        transition={{ duration: 0.2 }}
                      />

                      <motion.span
                        className={styles.ctaIconWrapper}
                        variants={{
                          idle: {
                            backgroundColor: "rgba(255,255,255,0.2)",
                            color: "#FFFFFF",
                          },
                          hover: {
                            backgroundColor: "rgba(37, 99, 235, 0.15)",
                            color: "#2563EB",
                          },
                        }}
                        transition={{ duration: 0.15 }}
                      >
                        <motion.span
                          animate={{ rotate: [0, 15, -15, 0] }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect
                              x="3"
                              y="4"
                              width="18"
                              height="18"
                              rx="2"
                              ry="2"
                            ></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                          </svg>
                        </motion.span>
                      </motion.span>

                      <motion.span
                        className={styles.ctaText}
                        variants={{
                          idle: { color: "#FFFFFF" },
                          hover: { color: "#1E3A8A" },
                        }}
                        transition={{ duration: 0.15 }}
                      >
                        Book a Free 15m Discovery Call
                      </motion.span>

                      {/* Hover Triggered High-Intensity Sweep */}

                      <motion.div
                        className={styles.ctaSheenHover}
                        variants={{
                          idle: { left: "-100%", opacity: 0 },
                          hover: { left: "200%", opacity: 1 },
                        }}
                        transition={{ duration: 0.7, ease: "circOut" }}
                      />

                      {/* Constant Deep Pulse Glow */}

                      <motion.div
                        className={styles.ctaPulseGlow}
                        animate={{
                          opacity: [0.2, 0.4, 0.2],
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    </motion.button>
                  </a>
                </motion.div>
              </div>

              {/* Zcal Booking Calendar */}
              <motion.div
                className={styles.calendarContainer}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 80,
                  damping: 20,
                  delay: 0.8,
                }}
              >
                <div className={styles.calendarHeader}>
                  <h3 className={styles.calendarTitle}>
                    Book Your Free Discovery Call
                  </h3>
                  <p className={styles.calendarSubtitle}>
                    Find a time that works best for you below.
                  </p>
                </div>
                <div className={styles.calendarWidgetWrapper}>
                  <div className="zcal-inline-widget">
                    <a href="https://zcal.co/i/mJZfHlI7">
                      Discovery Call - Schedule a meeting
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </main>

        <AnimatePresence>
          {isVideoModalOpen && (
            <motion.div
              className={styles.videoModalOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsVideoModalOpen(false)}
            >
              <motion.div
                className={styles.videoModalContent}
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className={styles.closeModalButton}
                  onClick={() => setIsVideoModalOpen(false)}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
                <video
                  src="/James.mp4"
                  controls
                  autoPlay
                  className={styles.videoModalPlayer}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Scroller />
      <Testimonials />
      <ProblemSection />
      <SolutionSection />
      <FinalCTASection />
    </>
  );
}
