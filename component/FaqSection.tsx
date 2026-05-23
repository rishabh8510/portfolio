// "use client";

// import { useState } from "react";
// import faqs from "@/data/faqs.json";

// function ChevronIcon({ open }: { open: boolean }) {
//   return (
//     <svg
//       className={`h-7 w-7 shrink-0 transition-transform duration-300 ${
//         open ? "rotate-180" : "rotate-0"
//       }`}
//       viewBox="0 0 24 24"
//       fill="none"
//     >
//       <path
//         d="M6 9L12 15L18 9"
//         className="stroke-gray-400"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//     </svg>
//   );
// }

// export default function FaqSection() {
//   const [openIndex, setOpenIndex] = useState(0);

//   return (
//     <section className="w-full px-6 py-20 sm:px-10 lg:px-24 lg:py-28">
//       <div className="mx-auto max-w-7xl px-6 lg:px-10">
//         {/* Header */}
//         <div className="flex flex-col items-center text-center">
//           <span className="inline-flex items-center rounded-full bg-orange-100 px-5 py-2 text-sm font-medium text-orange-500">
//             FAQs
//           </span>

//           <h2 className="max-w-4xl pt-10 text-4xl font-medium leading-tight tracking-tight text-gray-800">
//             Need Help Before You Build?
//           </h2>

//           <p className="max-w-3xl pt-6 text-base leading-relaxed text-gray-500 sm:text-lg">
//             Find quick answers to the most common inquiries from new and returning clients
//           </p>
//         </div>

//         {/* FAQ List */}
//         <div className="pt-5">
//           {faqs.map((item, index) => {
//             const isOpen = openIndex === index;

//             return (
//               <div key={item.id} className="border-b border-gray-200">
//                 <button
//                   type="button"
//                   onClick={() => setOpenIndex(isOpen ? -1 : index)}
//                   className="grid w-full grid-cols-[60px_minmax(0,1fr)_32px] items-start gap-x-4 py-10 text-left sm:grid-cols-[80px_minmax(0,1fr)_40px] sm:gap-x-6 lg:grid-cols-[100px_minmax(0,1fr)_48px]"
//                 >
//                   {/* Number */}
//                   <span className="pt-1 text-2xl leading-none text-orange-500 sm:text-3xl">
//                     {item.id}
//                   </span>

//                   {/* Content */}
//                   <div className="min-w-0">
//                     <h3 className="text-xl font-medium leading-snug text-gray-800 sm:text-2xl lg:text-3xl">
//                       {item.question}
//                     </h3>

//                     <div
//                       className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
//                         isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
//                       }`}
//                     >
//                       <div className="overflow-hidden">
//                         <p className="max-w-3xl pt-6 text-base leading-relaxed text-gray-500 sm:text-lg">
//                           {item.answer}
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Icon */}
//                   <div className="flex justify-end pt-2">
//                     <ChevronIcon open={isOpen} />
//                   </div>
//                 </button>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import faqs from "@/data/faqs.json";

gsap.registerPlugin(ScrollTrigger);

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-7 w-7 shrink-0 transition-transform duration-300 ${
        open ? "rotate-180" : "rotate-0"
      }`}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M6 9L12 15L18 9"
        className="stroke-gray-400"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);
  
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const faqItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  // Store ScrollTriggers for cleanup
  const scrollTriggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Badge Animation
      if (badgeRef.current) {
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
      }
      
      // 2. Heading Words Stagger Animation
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
      
      // 3. Subtext Animation
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
      
      // 4. FAQ Items Stagger Animation
      faqItemsRef.current.forEach((item, i) => {
        if (!item) return;
        
        // Get elements inside each FAQ item
        const number = item.querySelector(".faq-number");
        const question = item.querySelector(".faq-question");
        const icon = item.querySelector(".faq-icon");
        
        // Set initial states
        gsap.set(item, { 
          opacity: 0, 
          y: 30,
          force3D: true
        });
        
        if (number) gsap.set(number, { opacity: 0, x: -20 });
        if (question) gsap.set(question, { opacity: 0, x: -20 });
        if (icon) gsap.set(icon, { opacity: 0, x: 20 });
        
        const itemST = ScrollTrigger.create({
          trigger: item,
          start: "top 88%",
          toggleActions: "play none none reverse",
          onEnter: () => {
            // Main item animation
            gsap.to(item, {
              opacity: 1,
              y: 0,
              duration: 0.5,
              delay: i * 0.08,
              ease: "power2.out",
              force3D: true,
              overwrite: true,
            });
            
            // Number animation
            if (number) {
              gsap.to(number, {
                opacity: 1,
                x: 0,
                duration: 0.4,
                delay: i * 0.08 + 0.1,
                ease: "power2.out",
              });
            }
            
            // Question animation
            if (question) {
              gsap.to(question, {
                opacity: 1,
                x: 0,
                duration: 0.4,
                delay: i * 0.08 + 0.15,
                ease: "power2.out",
              });
            }
            
            // Icon animation
            if (icon) {
              gsap.to(icon, {
                opacity: 1,
                x: 0,
                duration: 0.4,
                delay: i * 0.08 + 0.2,
                ease: "power2.out",
              });
            }
          },
          onLeaveBack: () => {
            gsap.set(item, { opacity: 0, y: 30 });
            if (number) gsap.set(number, { opacity: 0, x: -20 });
            if (question) gsap.set(question, { opacity: 0, x: -20 });
            if (icon) gsap.set(icon, { opacity: 0, x: 20 });
          },
        });
        scrollTriggersRef.current.push(itemST);
      });
      
      // 5. Answer Animation on Toggle
      // This will be handled by the existing CSS transition
      // GSAP not needed for answer animation to avoid conflicts
      
      // Refresh ScrollTrigger
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
      
    }, sectionRef);
    
    return () => {
      // Clean up only this component's ScrollTriggers
      scrollTriggersRef.current.forEach((st) => {
        if (st && st.kill) st.kill();
      });
      scrollTriggersRef.current = [];
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="w-full px-6 py-20 sm:px-10 lg:px-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <span
            ref={badgeRef}
            className="inline-flex items-center rounded-full bg-orange-100 px-5 py-2 text-sm font-medium text-orange-500"
          >
            FAQs
          </span>

          <h2
            ref={headingRef}
            className="max-w-4xl pt-10 text-4xl font-medium leading-tight tracking-tight text-gray-800"
          >
            Need Help Before You Build?
          </h2>

          <p
            ref={subtextRef}
            className="max-w-3xl pt-6 text-base leading-relaxed text-gray-500 sm:text-lg"
          >
            Find quick answers to the most common inquiries from new and returning clients
          </p>
        </div>

        {/* FAQ List */}
        <div className="pt-5">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={item.id}
                ref={(el) => { faqItemsRef.current[index] = el; }}
                className="border-b border-gray-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="grid w-full grid-cols-[60px_minmax(0,1fr)_32px] items-start gap-x-4 py-10 text-left sm:grid-cols-[80px_minmax(0,1fr)_40px] sm:gap-x-6 lg:grid-cols-[100px_minmax(0,1fr)_48px]"
                >
                  {/* Number */}
                  <span className="faq-number pt-1 text-2xl leading-none text-orange-500 sm:text-3xl">
                    {item.id}
                  </span>

                  {/* Content */}
                  <div className="min-w-0">
                    <h3 className="faq-question text-xl font-medium leading-snug text-gray-800 sm:text-2xl lg:text-3xl">
                      {item.question}
                    </h3>

                    <div
                      className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="max-w-3xl pt-6 text-base leading-relaxed text-gray-500 sm:text-lg">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="faq-icon flex justify-end pt-2">
                    <ChevronIcon open={isOpen} />
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}