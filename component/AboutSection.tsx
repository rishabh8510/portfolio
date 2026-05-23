"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const statsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  // Store only this component's ScrollTriggers
  const scrollTriggersRef = useRef<ScrollTrigger[]>([]);
  const counterAnimations = useRef<gsap.core.Tween[]>([]);

  // Stats data
  const stats = [
    { value: 3, suffix: "+", label: "Years of Experience" },
    { value: 25, suffix: "+", label: "Projects Delivered" },
    { value: 10, suffix: "+", label: "Happy Clients" },
    { value: 15, suffix: "+", label: "Technologies Mastered" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // ── 1. Badge: fade + slide down ──────────────────────────────
      const badgeST = ScrollTrigger.create({
        trigger: badgeRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
        onEnter: () => {
          gsap.fromTo(badgeRef.current, 
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
          );
        },
        onLeaveBack: () => {
          gsap.set(badgeRef.current, { opacity: 0, y: -20 });
        }
      });
      scrollTriggersRef.current.push(badgeST);

      // ── 2. Heading words: staggered slide-up reveal ──────────────
      const words = headingRef.current?.querySelectorAll(".word");
      if (words?.length) {
        // Set initial state
        gsap.set(words, { opacity: 0, y: 60, rotateX: -20 });
        
        const headingST = ScrollTrigger.create({
          trigger: headingRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
          onEnter: () => {
            gsap.to(words, {
              opacity: 1,
              y: 0,
              rotateX: 0,
              stagger: 0.04,
              duration: 0.7,
              ease: "power4.out",
            });
          },
          onLeaveBack: () => {
            gsap.set(words, { opacity: 0, y: 60, rotateX: -20 });
          }
        });
        scrollTriggersRef.current.push(headingST);
      }

      // ── 3. Button: slide in from right ───────────────────────────
      gsap.set(buttonRef.current, { opacity: 0, x: 40 });
      
      const buttonST = ScrollTrigger.create({
        trigger: buttonRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
        onEnter: () => {
          gsap.to(buttonRef.current, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
          });
        },
        onLeaveBack: () => {
          gsap.set(buttonRef.current, { opacity: 0, x: 40 });
        }
      });
      scrollTriggersRef.current.push(buttonST);

      // ── 4. Stats: stagger fade-up + number counter ───────────────
      statsRef.current.forEach((el, i) => {
        if (!el) return;

        const numEl = el.querySelector<HTMLElement>(".stat-number");
        const line = el.querySelector<HTMLElement>(".stat-line");
        const target = stats[i].value;
        const suffix = stats[i].suffix;

        // Initial setup
        gsap.set(el, { opacity: 0, y: 50 });
        if (line) gsap.set(line, { scaleX: 0 });

        let counterAnimation: gsap.core.Tween | null = null;

        // Create ScrollTrigger for each stat
        const statST = ScrollTrigger.create({
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none reverse",
          onEnter: () => {
            // Entrance animation
            gsap.to(el, {
              opacity: 1,
              y: 0,
              duration: 0.7,
              delay: i * 0.12,
              ease: "power3.out",
            });

            // Line expand animation
            if (line) {
              gsap.to(line, {
                scaleX: 1,
                duration: 0.8,
                delay: i * 0.12 + 0.2,
                ease: "power2.out",
              });
            }

            // Kill previous counter animation if exists
            if (counterAnimation) {
              counterAnimation.kill();
            }

            // Reset to 0
            if (numEl) numEl.textContent = `0${suffix}`;

            // Start new counter animation
            const obj = { val: 0 };
            counterAnimation = gsap.to(obj, {
              val: target,
              duration: 1.8,
              delay: i * 0.12 + 0.3,
              ease: "power2.out",
              onUpdate: () => {
                if (numEl) {
                  const currentVal = Math.ceil(obj.val);
                  numEl.textContent = currentVal + suffix;
                }
              },
              onComplete: () => {
                if (numEl) {
                  numEl.textContent = target + suffix;
                }
              },
            });
            
            // Store for cleanup
            counterAnimations.current.push(counterAnimation);
          },
          onLeaveBack: () => {
            // Reset everything when scrolling back up
            gsap.set(el, { opacity: 0, y: 50 });
            if (line) gsap.set(line, { scaleX: 0 });
            if (numEl) {
              numEl.textContent = `0${suffix}`;
            }
            // Kill counter animation
            if (counterAnimation) {
              counterAnimation.kill();
              counterAnimation = null;
            }
          },
        });
        scrollTriggersRef.current.push(statST);
      });

      // Initial refresh to ensure proper state
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);

    }, sectionRef);

    return () => {
      // Clean up ONLY this component's counter animations
      if (counterAnimations.current) {
        counterAnimations.current.forEach((anim) => {
          if (anim) anim.kill();
        });
        counterAnimations.current = [];
      }
      
      // Clean up ONLY this component's ScrollTriggers
      scrollTriggersRef.current.forEach((st) => {
        if (st && st.kill) {
          st.kill();
        }
      });
      scrollTriggersRef.current = [];
      
      // Revert GSAP context (only affects this component)
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="w-full mb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Top Badge */}
        <span
          ref={badgeRef}
          className="inline-block bg-black text-white text-sm px-4 py-1 rounded-full mb-6"
        >
          About Me
        </span>

        {/* Heading + Button */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

          {/* Heading with word-split animation */}
          <h2
            ref={headingRef}
            className="text-3xl md:text-5xl font-semibold text-gray-800 leading-tight max-w-3xl"
            style={{ perspective: "600px" }}
          >
            {["A", "passionate", "developer", "crafting"].map((word, i) => (
              <span
                key={`w1-${i}`}
                className="word inline-block mr-[0.25em]"
                style={{ display: "inline-block" }}
              >
                {word}
              </span>
            ))}
            {" "}
            <span className="text">
              {["clean,", "purposeful"].map((word, i) => (
                <span
                  key={`w2-${i}`}
                  className="word inline-block mr-[0.25em]"
                  style={{ display: "inline-block" }}
                >
                  {word}
                </span>
              ))}
            </span>{" "}
            {["digital", "experiences", "that", "leave", "a", "lasting", "impression."].map((word, i) => (
              <span
                key={`w3-${i}`}
                className="word inline-block mr-[0.25em]"
                style={{ display: "inline-block" }}
              >
                {word}
              </span>
            ))}
          </h2>

          {/* Button */}
          <button
            ref={buttonRef}
            className="border border-gray-400 px-6 py-3 text-sm flex items-center gap-2 hover:bg-black hover:text-white transition-all duration-300 whitespace-nowrap"
          >
            View My Work
            <span className="text-lg">→</span>
          </button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mt-16 text-center">
          {stats.map((stat, i) => (
            <div
              key={i}
              ref={(el) => { statsRef.current[i] = el; }}
              className="stat-card"
            >
              <div className="stat-line w-24 h-[1px] bg-gray-300 mx-auto mb-6 origin-left" />
              <h3 className="stat-number text-4xl font-semibold text-gray-800">
                0{stat.suffix}
              </h3>
              <p className="text-gray-500 mt-2 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}