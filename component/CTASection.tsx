// import React from "react";

// const CTASection: React.FC = () => {
//   return (
//     <section className="bg-[#6f8f98] text-white py-24 px-6 text-center">
//       <div className="max-w-4xl mx-auto">
        
//         {/* Heading */}
//         <h1 className="text-4xl md:text-5xl font-light leading-tight">
//           Ready to Build Something <br className="hidden md:block" />
//           Remarkable?
//         </h1>

//         {/* Divider */}
//         <div className="w-full h-px bg-white/40 my-10"></div>

//         {/* Button */}
//         <a
//           href="#projects"
//           className="inline-flex items-center gap-2 bg-white text-gray-800 px-6 py-3 text-sm font-medium hover:bg-gray-100 transition duration-300"
//         >
//           View More Projects
//           <span className="text-lg">→</span>
//         </a>
//       </div>
//     </section>
//   );
// };

// export default CTASection;


"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CTASection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  
  // Store ScrollTriggers for cleanup
  const scrollTriggersRef = useRef<ScrollTrigger[]>([]);
  let hoverAnimations = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Heading Words Stagger Animation - OPTIMIZED
      if (headingRef.current) {
        const headingText = headingRef.current.textContent || "";
        const words = headingText.split(" ");
        
        // Wrap each word in a span
        let htmlContent = "";
        words.forEach((word) => {
          if (word === "Remarkable?") {
            htmlContent += `<span class="word inline-block mr-[0.25em]" style="display:inline-block">${word}</span>`;
          } else {
            htmlContent += `<span class="word inline-block mr-[0.25em]" style="display:inline-block">${word}</span> `;
          }
        });
        
        headingRef.current.innerHTML = htmlContent;
        
        const wordElements = headingRef.current.querySelectorAll<HTMLElement>(".word");
        
        // Set initial state with GPU acceleration
        gsap.set(wordElements, { 
          opacity: 0, 
          y: 30,
          force3D: true
        });
        
        const headingST = ScrollTrigger.create({
          trigger: headingRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
          onEnter: () => {
            gsap.to(wordElements, {
              opacity: 1,
              y: 0,
              stagger: 0.04,
              duration: 0.6,
              ease: "power2.out",
              force3D: true,
              overwrite: true,
            });
          },
          onLeaveBack: () => {
            gsap.set(wordElements, { 
              opacity: 0, 
              y: 30,
              force3D: true
            });
          },
        });
        scrollTriggersRef.current.push(headingST);
      }
      
      // 2. Divider Animation - OPTIMIZED
      if (dividerRef.current) {
        gsap.set(dividerRef.current, { 
          scaleX: 0,
          transformOrigin: "center center",
          force3D: true
        });
        
        const dividerST = ScrollTrigger.create({
          trigger: dividerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
          onEnter: () => {
            if (dividerRef.current) {
              gsap.to(dividerRef.current, {
                scaleX: 1,
                duration: 0.8,
                delay: 0.2,
                ease: "power2.out",
                force3D: true,
                overwrite: true,
              });
            }
          },
          onLeaveBack: () => {
            if (dividerRef.current) {
              gsap.set(dividerRef.current, { 
                scaleX: 0,
                force3D: true
              });
            }
          },
        });
        scrollTriggersRef.current.push(dividerST);
      }
      
      // 3. Button Animation - OPTIMIZED
      if (buttonRef.current) {
        gsap.set(buttonRef.current, { 
          opacity: 0, 
          y: 15,
          force3D: true
        });
        
        const buttonST = ScrollTrigger.create({
          trigger: buttonRef.current,
          start: "top 88%",
          toggleActions: "play none none reverse",
          onEnter: () => {
            if (buttonRef.current) {
              gsap.to(buttonRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                delay: 0.3,
                ease: "power2.out",
                force3D: true,
                overwrite: true,
                clearProps: "transform",
              });
            }
          },
          onLeaveBack: () => {
            if (buttonRef.current) {
              gsap.set(buttonRef.current, { 
                opacity: 0, 
                y: 15,
                force3D: true
              });
            }
          },
        });
        scrollTriggersRef.current.push(buttonST);
      }
      
      // 4. Button Hover Animation - OPTIMIZED
      if (buttonRef.current) {
        const handleMouseEnter = () => {
          if (buttonRef.current) {
            const arrow = buttonRef.current.querySelector("span");
            if (arrow) {
              // Kill any existing animation
              if (hoverAnimations.current) {
                hoverAnimations.current.kill();
              }
              // Start new animation
              hoverAnimations.current = gsap.to(arrow, {
                x: 6,
                duration: 0.25,
                ease: "power2.out",
                force3D: true,
                overwrite: true,
              });
            }
            // Button scale effect
            gsap.to(buttonRef.current, {
              scale: 1.02,
              duration: 0.25,
              ease: "power2.out",
              force3D: true,
              overwrite: true,
            });
          }
        };
        
        const handleMouseLeave = () => {
          if (buttonRef.current) {
            const arrow = buttonRef.current.querySelector("span");
            if (arrow) {
              if (hoverAnimations.current) {
                hoverAnimations.current.kill();
              }
              hoverAnimations.current = gsap.to(arrow, {
                x: 0,
                duration: 0.25,
                ease: "power2.out",
                force3D: true,
                overwrite: true,
              });
            }
            // Reset button scale
            gsap.to(buttonRef.current, {
              scale: 1,
              duration: 0.25,
              ease: "power2.out",
              force3D: true,
              overwrite: true,
            });
          }
        };
        
        buttonRef.current.addEventListener("mouseenter", handleMouseEnter);
        buttonRef.current.addEventListener("mouseleave", handleMouseLeave);
        
        // Store cleanup function
        const cleanup = () => {
          if (buttonRef.current) {
            buttonRef.current.removeEventListener("mouseenter", handleMouseEnter);
            buttonRef.current.removeEventListener("mouseleave", handleMouseLeave);
          }
          if (hoverAnimations.current) {
            hoverAnimations.current.kill();
          }
        };
        
        (buttonRef.current as any)._cleanupHover = cleanup;
      }
      
      // Refresh ScrollTrigger
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
      
    }, sectionRef);
    
    return () => {
      // Clean up hover event listeners
      if (buttonRef.current && (buttonRef.current as any)._cleanupHover) {
        (buttonRef.current as any)._cleanupHover();
        delete (buttonRef.current as any)._cleanupHover;
      }
      
      // Clean up only this component's ScrollTriggers
      scrollTriggersRef.current.forEach((st) => {
        if (st && st.kill) st.kill();
      });
      scrollTriggersRef.current = [];
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#6f8f98] text-white py-24 px-6 text-center">
      <div className="max-w-4xl mx-auto">
        
        {/* Heading */}
        <h1 
          ref={headingRef}
          className="text-4xl md:text-5xl font-light leading-tight"
        >
          Ready to Build Something <br className="hidden md:block" />
          Remarkable?
        </h1>

        {/* Divider */}
        <div ref={dividerRef} className="w-full h-px bg-white/40 my-10 origin-center"></div>

        {/* Button */}
        <a
          ref={buttonRef}
          href="#projects"
          className="inline-flex items-center gap-2 bg-white text-gray-800 px-6 py-3 text-sm font-medium hover:bg-gray-100 transition-colors duration-300"
        >
          View More Projects
          <span className="text-lg inline-block">→</span>
        </a>
      </div>
    </section>
  );
};

export default CTASection;