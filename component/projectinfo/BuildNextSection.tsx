// export default function BuildNextSection() {
//   return (
//     <section className="w-full bg-[#7896A3] text-white">
//       <div className="mx-auto flex max-w-6xl flex-col items-center px-6 py-20 text-center md:px-10 md:py-24">
//         <h2 className="max-w-5xl text-4xl font-semibold tracking-[-0.03em] md:text-6xl">
//           Let&apos;s Build What&apos;s Next
//         </h2>

//         <p className="mt-6 max-w-3xl text-sm font-normal leading-relaxed text-white/90 md:text-[17px]">
//           Ready to start your own project or curious about what else we&apos;ve
//           built? Explore more of our work, our servicep, or connect with the
//           Bricknet team.
//         </p>

//         <div className="mt-12 h-px w-full max-w-4xl bg-white/70" />

//         <div className="mt-14 flex flex-col items-center gap-4 sm:flex-row">
//           <button className="inline-flex min-w-[180px] items-center justify-center gap-3 bg-white px-7 py-4 text-sm font-medium text-[#1E2A32] transition hover:bg-white/90">
//             <span>View More Project</span>
//             <span className="text-lg leading-none">→</span>
//           </button>

//           <button className="inline-flex min-w-[180px] items-center justify-center gap-3 border border-white/80 bg-transparent px-7 py-4 text-sm font-medium text-white transition hover:bg-white/10">
//             <span>Contact Our Team</span>
//             <span className="text-lg leading-none">→</span>
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BuildNextSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const button1Ref = useRef<HTMLButtonElement>(null);
  const button2Ref = useRef<HTMLButtonElement>(null);
  
  // Store ScrollTriggers for cleanup
  const scrollTriggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Heading Words Stagger Animation
      if (headingRef.current) {
        const headingText = headingRef.current.textContent || "";
        const words = headingText.split(" ");
        
        // Wrap each word in a span
        let htmlContent = "";
        words.forEach((word) => {
          htmlContent += `<span class="word inline-block mr-[0.25em]" style="display:inline-block">${word}</span> `;
        });
        
        headingRef.current.innerHTML = htmlContent.trim();
        
        const wordElements = headingRef.current.querySelectorAll<HTMLElement>(".word");
        
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
      
      // 2. Subtext Animation
      if (subtextRef.current) {
        gsap.set(subtextRef.current, { opacity: 0, y: 20 });
        const subtextST = ScrollTrigger.create({
          trigger: subtextRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
          onEnter: () => {
            gsap.to(subtextRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: 0.2,
              ease: "power2.out",
            });
          },
          onLeaveBack: () => {
            gsap.set(subtextRef.current, { opacity: 0, y: 20 });
          },
        });
        scrollTriggersRef.current.push(subtextST);
      }
      
      // 3. Divider Animation - Scale from center
      if (dividerRef.current) {
        gsap.set(dividerRef.current, { 
          scaleX: 0,
          opacity: 0
        });
        
        const dividerST = ScrollTrigger.create({
          trigger: dividerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
          onEnter: () => {
            if (dividerRef.current) {
              gsap.to(dividerRef.current, {
                scaleX: 1,
                opacity: 1,
                duration: 0.8,
                delay: 0.3,
                ease: "power2.out",
              });
            }
          },
          onLeaveBack: () => {
            if (dividerRef.current) {
              gsap.set(dividerRef.current, { 
                scaleX: 0,
                opacity: 0
              });
            }
          },
        });
        scrollTriggersRef.current.push(dividerST);
      }
      
      // 4. Buttons Container Animation
      if (buttonsRef.current) {
        gsap.set(buttonsRef.current, { opacity: 0, y: 20 });
        const buttonsST = ScrollTrigger.create({
          trigger: buttonsRef.current,
          start: "top 88%",
          toggleActions: "play none none reverse",
          onEnter: () => {
            gsap.to(buttonsRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: 0.4,
              ease: "power2.out",
            });
          },
          onLeaveBack: () => {
            gsap.set(buttonsRef.current, { opacity: 0, y: 20 });
          },
        });
        scrollTriggersRef.current.push(buttonsST);
      }
      
      // 5. Button 1 Hover Animation
      if (button1Ref.current) {
        const handleMouseEnter = () => {
          if (button1Ref.current) {
            const arrow = button1Ref.current.querySelector("span:last-child");
            gsap.to(button1Ref.current, {
              scale: 1.02,
              duration: 0.25,
              ease: "power2.out",
            });
            if (arrow) {
              gsap.to(arrow, {
                x: 5,
                duration: 0.25,
                ease: "power2.out",
              });
            }
          }
        };
        
        const handleMouseLeave = () => {
          if (button1Ref.current) {
            const arrow = button1Ref.current.querySelector("span:last-child");
            gsap.to(button1Ref.current, {
              scale: 1,
              duration: 0.25,
              ease: "power2.out",
            });
            if (arrow) {
              gsap.to(arrow, {
                x: 0,
                duration: 0.25,
                ease: "power2.out",
              });
            }
          }
        };
        
        button1Ref.current.addEventListener("mouseenter", handleMouseEnter);
        button1Ref.current.addEventListener("mouseleave", handleMouseLeave);
        
        const cleanup = () => {
          if (button1Ref.current) {
            button1Ref.current.removeEventListener("mouseenter", handleMouseEnter);
            button1Ref.current.removeEventListener("mouseleave", handleMouseLeave);
          }
        };
        
        (button1Ref.current as any)._cleanupHover = cleanup;
      }
      
      // 6. Button 2 Hover Animation
      if (button2Ref.current) {
        const handleMouseEnter = () => {
          if (button2Ref.current) {
            const arrow = button2Ref.current.querySelector("span:last-child");
            gsap.to(button2Ref.current, {
              scale: 1.02,
              duration: 0.25,
              ease: "power2.out",
            });
            if (arrow) {
              gsap.to(arrow, {
                x: 5,
                duration: 0.25,
                ease: "power2.out",
              });
            }
          }
        };
        
        const handleMouseLeave = () => {
          if (button2Ref.current) {
            const arrow = button2Ref.current.querySelector("span:last-child");
            gsap.to(button2Ref.current, {
              scale: 1,
              duration: 0.25,
              ease: "power2.out",
            });
            if (arrow) {
              gsap.to(arrow, {
                x: 0,
                duration: 0.25,
                ease: "power2.out",
              });
            }
          }
        };
        
        button2Ref.current.addEventListener("mouseenter", handleMouseEnter);
        button2Ref.current.addEventListener("mouseleave", handleMouseLeave);
        
        const cleanup = () => {
          if (button2Ref.current) {
            button2Ref.current.removeEventListener("mouseenter", handleMouseEnter);
            button2Ref.current.removeEventListener("mouseleave", handleMouseLeave);
          }
        };
        
        (button2Ref.current as any)._cleanupHover = cleanup;
      }
      
      // Refresh ScrollTrigger
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
      
    }, sectionRef);
    
    return () => {
      // Clean up hover event listeners
      if (button1Ref.current && (button1Ref.current as any)._cleanupHover) {
        (button1Ref.current as any)._cleanupHover();
        delete (button1Ref.current as any)._cleanupHover;
      }
      if (button2Ref.current && (button2Ref.current as any)._cleanupHover) {
        (button2Ref.current as any)._cleanupHover();
        delete (button2Ref.current as any)._cleanupHover;
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
    <section ref={sectionRef} className="w-full bg-[#7896A3] text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-6 py-20 text-center md:px-10 md:py-24">
        <h2 ref={headingRef} className="max-w-5xl text-4xl font-semibold tracking-[-0.03em] md:text-6xl">
          Let&apos;s Build What&apos;s Next
        </h2>

        <p ref={subtextRef} className="mt-6 max-w-3xl text-sm font-normal leading-relaxed text-white/90 md:text-[17px]">
          Ready to start your own project or curious about what else we&apos;ve
          built? Explore more of our work, our services, or connect with the
          Bricknet team.
        </p>

        <div ref={dividerRef} className="mt-12 h-px w-full max-w-4xl bg-white/70 origin-center" />

        <div ref={buttonsRef} className="mt-14 flex flex-col items-center gap-4 sm:flex-row">
          <button
            ref={button1Ref}
            className="inline-flex min-w-[180px] items-center justify-center gap-3 bg-white px-7 py-4 text-sm font-medium text-[#1E2A32] transition hover:bg-white/90"
          >
            <span>View More Project</span>
            <span className="text-lg leading-none inline-block">→</span>
          </button>

          <button
            ref={button2Ref}
            className="inline-flex min-w-[180px] items-center justify-center gap-3 border border-white/80 bg-transparent px-7 py-4 text-sm font-medium text-white transition hover:bg-white/10"
          >
            <span>Contact Our Team</span>
            <span className="text-lg leading-none inline-block">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}