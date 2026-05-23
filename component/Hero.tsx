"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonRef = useRef(null);

  // Function to run animations
  const animateContent = () => {
    // Kill any ongoing animations first
    gsap.killTweensOf([badgeRef.current, headingRef.current, descriptionRef.current, buttonRef.current]);
    
    // Set initial states
    gsap.set([badgeRef.current, headingRef.current, descriptionRef.current, buttonRef.current], {
      opacity: 0,
      y: 30
    });

    // Create a timeline for sequential animations
    const tl = gsap.timeline();
    
    tl.fromTo(badgeRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
    )
    .fromTo(headingRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      "-=0.3"
    )
    .fromTo(descriptionRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      "-=0.3"
    )
    .fromTo(buttonRef.current,
      { opacity: 0, y: 30, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.2)" },
      "-=0.3"
    );
  };

  useEffect(() => {
    // Run animation when component mounts
    animateContent();

    // Add hover animation to button
    const button = buttonRef.current;
    const handleMouseEnter = () => {
      gsap.to(button, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out"
      });
    };
    
    const handleMouseLeave = () => {
      gsap.to(button, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    button?.addEventListener("mouseenter", handleMouseEnter);
    button?.addEventListener("mouseleave", handleMouseLeave);

    // Setup intersection observer to re-run animation when component comes into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Re-run animation when component becomes visible
            animateContent();
          }
        });
      },
      { threshold: 0.1 } // Trigger when at least 10% of component is visible
    );

    const section = document.querySelector('section');
    if (section) {
      observer.observe(section);
    }

    // Cleanup
    return () => {
      button?.removeEventListener("mouseenter", handleMouseEnter);
      button?.removeEventListener("mouseleave", handleMouseLeave);
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []); // Empty dependency but observer handles re-runs

  return (
    <section className="relative w-full h-screen flex items-center justify-center text-center">
      
      {/* Background Image */}
      <Image
        src="/background.jpg"
        alt="Construction"
        fill
        priority
        className="object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl px-6 text-white">
        
        {/* Small Badge */}
        <div 
          ref={badgeRef}
          className="inline-flex items-center gap-2 border border-white/40 rounded-full px-4 py-1 text-sm mb-6 backdrop-blur-sm"
        >
          <span className="w-2 h-2 bg-white rounded-full"></span>
          Available for freelance work
        </div>

        {/* Heading */}
        <h1 
          ref={headingRef}
          className="text-4xl md:text-6xl font-semibold leading-tight mb-6"
        >
          Hi, I'm Rishabh - I Build Things for the Web
        </h1>

        {/* Description */}
        <p 
          ref={descriptionRef}
          className="text-white/80 text-lg mb-8"
        >
          A passionate full-stack developer crafting clean, fast, and user-focused
          digital experiences — from concept to deployment.
        </p>

        {/* Button */}
        <button 
          ref={buttonRef}
          className="bg-white text-black px-6 py-3 flex items-center gap-2 mx-auto hover:bg-gray-200 transition"
        >
          View My Work
          <span>→</span>
        </button>
      </div>
    </section>
  );
}