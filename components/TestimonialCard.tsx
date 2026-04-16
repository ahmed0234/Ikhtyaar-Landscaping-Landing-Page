"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./TestimonialCard.module.css";

interface TestimonialCardProps {
  name: string;
  role: string;
  avatar: string;
  text: string;
  stars: number;
}

export default function TestimonialCard({ name, role, avatar, text, stars }: TestimonialCardProps) {
  return (
    <motion.div 
      className={styles.card}
      whileHover={{ y: -12, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className={styles.cardReflect}></div>
      <div className={styles.avatarContainer}>
        <img src={avatar} alt={name} className={styles.avatar} />
      </div>
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.role}>{role}</p>
      <div className={styles.stars}>
        {[...Array(5)].map((_, i) => (
          <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < stars ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        ))}
      </div>
      <p className={styles.text}>"{text}"</p>
    </motion.div>
  );
}
