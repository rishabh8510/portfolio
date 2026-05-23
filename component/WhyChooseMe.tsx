// "use client";

// import values from "@/data/values.json";
// import { GiCrafting, GiClockwork } from "react-icons/gi";
// import { TbBulbFilled } from "react-icons/tb";
// import { IoLogoFigma } from "react-icons/io5";

// const iconMap: any = {
//   tools: GiCrafting,
//   clock: GiClockwork,
//   helmet: TbBulbFilled,
//   wifi: IoLogoFigma,
// };

// export default function WhyChooseMe() {
//   return (
//     <section className="py-20 px-6">
//       <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-12 items-start">
        
//         {/* LEFT SIDE */}
//         <div>
//           <span className="inline-block bg-black text-white text-sm px-4 py-1 rounded-full mb-6">
//             Why Choose Me
//           </span>

//           <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 leading-tight mb-6">
//             Crafting Scalable & Modern Web Experiences
//           </h2>

//           <p className="text-gray-600 text-lg leading-relaxed mb-6">
//             I build high-performance web applications with clean code, modern design, and a strong focus on user experience.
//           </p>

//           <button className="mt-4 border border-gray-900 px-6 py-3 flex items-center gap-2 text-sm font-medium hover:bg-black hover:text-white transition-all duration-300">
//             View My Work →
//           </button>
//         </div>

//         {/* RIGHT SIDE */}
//         <div>
//           <p className="text-gray-600 text-lg mb-10 leading-relaxed">
//             From idea to deployment, I ensure every project is efficient, scalable, and aligned with modern development standards.
//           </p>

//           <div className="grid sm:grid-cols-2 gap-10">
//             {values.map((item) => {
//               const Icon = iconMap[item.icon];

//               return (
//                 <div
//                   key={item.id}
//                   className="group hover:translate-y-[-5px] transition duration-300"
//                 >
//                   <div className="w-12 h-12 flex items-center justify-center bg-orange-100 text-orange-500 mb-4 group-hover:bg-orange-500 group-hover:text-white transition">
//                     <Icon size={20} />
//                   </div>

//                   <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                     {item.title}
//                   </h3>

//                   <p className="text-gray-500 text-sm leading-relaxed">
//                     {item.description}
//                   </p>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//       </div>
//     </section>
//   );
// }
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import values from "@/data/values.json";
import { GiCrafting, GiClockwork } from "react-icons/gi";
import { TbBulbFilled } from "react-icons/tb";
import { IoLogoFigma } from "react-icons/io5";

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ElementType> = {
  tools: GiCrafting,
  clock: GiClockwork,
  helmet: TbBulbFilled,
  wifi: IoLogoFigma,
};

export default function WhyChooseMe() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const leftParaRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rightParaRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  // Store only this component's ScrollTriggers
  const scrollTriggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── 1. Badge Animation ─────────────────────────────────────
      gsap.set(badgeRef.current, { opacity: 0, y: -20 });
      
      const badgeST = ScrollTrigger.create({
        trigger: badgeRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
        onEnter: () => {
          gsap.to(badgeRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          });
        },
        onLeaveBack: () => {
          gsap.set(badgeRef.current, { opacity: 0, y: -20 });
        },
      });
      scrollTriggersRef.current.push(badgeST);

      // ── 2. Heading Words Stagger Animation ──────────────────────
      const words = headingRef.current?.textContent?.split(" ");
      if (headingRef.current && words) {
        // Wrap each word in a span
        headingRef.current.innerHTML = words
          .map((word) => `<span class="word inline-block mr-[0.25em]" style="display:inline-block">${word}</span>`)
          .join(" ");
        
        const wordElements = headingRef.current.querySelectorAll<HTMLElement>(".word");
        
        gsap.set(wordElements, { opacity: 0, y: 40, rotateX: -10 });
        
        const headingST = ScrollTrigger.create({
          trigger: headingRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
          onEnter: () => {
            gsap.to(wordElements, {
              opacity: 1,
              y: 0,
              rotateX: 0,
              stagger: 0.03,
              duration: 0.6,
              ease: "power2.out",
            });
          },
          onLeaveBack: () => {
            gsap.set(wordElements, { opacity: 0, y: 40, rotateX: -10 });
          },
        });
        scrollTriggersRef.current.push(headingST);
      }

      // ── 3. Left Paragraph Animation ─────────────────────────────
      gsap.set(leftParaRef.current, { opacity: 0, y: 30 });
      
      const leftParaST = ScrollTrigger.create({
        trigger: leftParaRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
        onEnter: () => {
          gsap.to(leftParaRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.05,
            ease: "power2.out",
          });
        },
        onLeaveBack: () => {
          gsap.set(leftParaRef.current, { opacity: 0, y: 30 });
        },
      });
      scrollTriggersRef.current.push(leftParaST);

      // ── 4. Button Animation ─────────────────────────────────────
      gsap.set(buttonRef.current, { opacity: 0, x: -20 });
      
      const buttonST = ScrollTrigger.create({
        trigger: buttonRef.current,
        start: "top 88%",
        toggleActions: "play none none reverse",
        onEnter: () => {
          gsap.to(buttonRef.current, {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power2.out",
          });
        },
        onLeaveBack: () => {
          gsap.set(buttonRef.current, { opacity: 0, x: -20 });
        },
      });
      scrollTriggersRef.current.push(buttonST);

      // ── 5. Right Paragraph Animation ────────────────────────────
      gsap.set(rightParaRef.current, { opacity: 0, y: 30 });
      
      const rightParaST = ScrollTrigger.create({
        trigger: rightParaRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
        onEnter: () => {
          gsap.to(rightParaRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.05,
            ease: "power2.out",
          });
        },
        onLeaveBack: () => {
          gsap.set(rightParaRef.current, { opacity: 0, y: 30 });
        },
      });
      scrollTriggersRef.current.push(rightParaST);

      // ── 6. CARDS - BUTTER SMOOTH ANIMATION (NO LAG) ─────────────────
      // Use a single timeline for all cards
      const cardsContainer = rightParaRef.current?.parentElement?.querySelector('.grid');
      
      if (cardsContainer) {
        // Set all cards to hidden initially with will-change for performance
        cardsRef.current.forEach((card) => {
          if (card) {
            card.style.opacity = "0";
            card.style.transform = "translateY(30px)";
            card.style.willChange = "transform, opacity";
          }
        });
        
        // Create ScrollTrigger for the entire cards container
        const cardsST = ScrollTrigger.create({
          trigger: cardsContainer,
          start: "top 85%",
          end: "bottom 70%",
          toggleActions: "play none none reverse",
          onEnter: () => {
            // Animate cards with a very smooth staggered timeline
            cardsRef.current.forEach((card, i) => {
              if (card) {
                // Use RAF for smoother animation
                requestAnimationFrame(() => {
                  gsap.to(card, {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    delay: i * 0.06,
                    ease: "power2.out",
                    overwrite: true,
                  });
                  
                  // Animate icon separately for pop effect
                  const icon = card.querySelector('.card-icon');
                  if (icon) {
                    gsap.fromTo(icon,
                      { scale: 0.3, opacity: 0 },
                      {
                        scale: 1,
                        opacity: 1,
                        duration: 0.4,
                        delay: i * 0.06 + 0.1,
                        ease: "back.out(0.8)",
                        overwrite: true,
                      }
                    );
                  }
                });
              }
            });
          },
          onLeaveBack: () => {
            // Reset all cards when scrolling back
            cardsRef.current.forEach((card) => {
              if (card) {
                gsap.set(card, { 
                  opacity: 0, 
                  y: 30,
                  clearProps: "transform"
                });
                const icon = card.querySelector('.card-icon');
                if (icon) {
                  gsap.set(icon, { scale: 0.3, opacity: 0 });
                }
              }
            });
          },
        });
        scrollTriggersRef.current.push(cardsST);
      }

      // Refresh ScrollTrigger after a short delay
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);

    }, sectionRef);

    return () => {
      // Clean up ONLY this component's ScrollTriggers
      scrollTriggersRef.current.forEach((st) => {
        if (st && st.kill) {
          st.kill();
        }
      });
      scrollTriggersRef.current = [];
      
      // Reset card styles
      cardsRef.current.forEach((card) => {
        if (card) {
          card.style.opacity = "";
          card.style.transform = "";
          card.style.willChange = "";
        }
      });
      
      // Revert GSAP context
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-6">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-12 items-start">

        {/* LEFT SIDE */}
        <div>
          <span
            ref={badgeRef}
            className="inline-block bg-black text-white text-sm px-4 py-1 rounded-full mb-6"
          >
            Why Choose Me
          </span>

          <h2
            ref={headingRef}
            className="text-4xl md:text-5xl font-semibold text-gray-900 leading-tight mb-6"
            style={{ perspective: "800px" }}
          >
            Crafting Scalable & Modern Web Experiences
          </h2>

          <p ref={leftParaRef} className="text-gray-600 text-lg leading-relaxed mb-6">
            I build high-performance web applications with clean code, modern design, and a strong focus on user experience.
          </p>

          <button
            ref={buttonRef}
            className="mt-4 border border-gray-900 px-6 py-3 flex items-center gap-2 text-sm font-medium hover:bg-black hover:text-white transition-all duration-300"
          >
            View My Work →
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div>
          <p ref={rightParaRef} className="text-gray-600 text-lg mb-10 leading-relaxed">
            From idea to deployment, I ensure every project is efficient, scalable, and aligned with modern development standards.
          </p>

          <div className="grid sm:grid-cols-2 gap-10">
            {values.map((item, index) => {
              const Icon = iconMap[item.icon];
              return (
                <div
                  key={item.id}
                  ref={(el) => { cardsRef.current[index] = el; }}
                  className="group"
                  style={{ 
                    willChange: "transform, opacity",
                    opacity: 0,
                    transform: "translateY(30px)"
                  }}
                >
                  <div className="card-icon w-12 h-12 flex items-center justify-center bg-orange-100 text-orange-500 mb-4 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                    <Icon size={20} />
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>

                  <p className="text-gray-500 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}