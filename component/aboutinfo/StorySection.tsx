// import Image from "next/image";
// import { storyData } from "@/data/storyData";

// export default function StorySection() {
//     return (
//         <section className="py-10 mt-10">
//             <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-10">

//                 {/* Header */}
//                 <div className="mb-14 md:mb-16">
//                     <span className="inline-flex rounded-full bg-black px-4 py-2 text-sm font-semibold text-white">
//                         {storyData.badge}
//                     </span>

//                     <h2 className="mt-6 max-w-7xl text-3xl font-medium leading-tight tracking-tight text-gray-800 md:text-4xl lg:text-5xl">
//                         {storyData.heading}
//                     </h2>
//                 </div>
//             </div>

//             {/* Sections */}
//             <div className="space-y-20 md:space-y-24">
//                 {storyData.sections.map((section, i) => (
                    
//                     // 👇 full width bg yaha apply hoga
//                     <div key={section.id} className={`${i === 1 ? "bg-[#f5f5f5] py-10" : ""}`}>
                        
//                         <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-10">
//                             <div
//                                 className={`grid items-start gap-10 lg:grid-cols-2 lg:gap-14 
//                                 ${section.reverse
//                                         ? "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1"
//                                         : ""
//                                     }`}
//                             >
//                                 {/* Image */}
//                                 <div className="relative overflow-hidden">
//                                     <div className="relative aspect-square w-full">
//                                         <Image
//                                             src={section.image}
//                                             alt={section.title}
//                                             fill
//                                             className="object-cover"
//                                             sizes="(max-width: 1024px) 100vw, 50vw"
//                                         />
//                                     </div>
//                                 </div>

//                                 {/* Content */}
//                                 <div className="pt-1">
//                                     <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
//                                         {section.title}
//                                     </h3>
//                                     <p className="text-lg leading-8 text-gray-500 md:text-md max-w-2xl">
//                                         {section.description}
//                                     </p>

//                                     <div className="mt-10 space-y-8">
//                                         {section.points.map((point, index) => (
//                                             <div
//                                                 key={index}
//                                                 className="border-t border-gray-300 pt-8 first:border-t-0 first:pt-0"
//                                             >
//                                                 <div className="flex items-start gap-4">

//                                                     {/* Number */}
//                                                     <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-orange-500 text-sm font-semibold text-orange-500">
//                                                         {String(index + 1).padStart(2, "0")}
//                                                     </div>

//                                                     {/* Text */}
//                                                     <div>
//                                                         <h3 className="text-2xl font-medium leading-tight text-gray-800">
//                                                             {point.title}
//                                                         </h3>
//                                                         <p className="mt-2 max-w-xl text-base leading-7 text-gray-500">
//                                                             {point.description}
//                                                         </p>
//                                                     </div>

//                                                 </div>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>

//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </section>
//     );
// }

"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { storyData } from "@/data/storyData";

gsap.registerPlugin(ScrollTrigger);

export default function StorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const contentsRef = useRef<(HTMLDivElement | null)[]>([]);
  
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
      
      // 3. Sections Stagger Animation
      sectionsRef.current.forEach((section, i) => {
        if (!section) return;
        
        // Set initial state for section
        gsap.set(section, { 
          opacity: 0, 
          y: 40,
          force3D: true
        });
        
        const sectionST = ScrollTrigger.create({
          trigger: section,
          start: "top 85%",
          toggleActions: "play none none reverse",
          onEnter: () => {
            gsap.to(section, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: i * 0.15,
              ease: "power2.out",
              force3D: true,
              overwrite: true,
            });
          },
          onLeaveBack: () => {
            gsap.set(section, { 
              opacity: 0, 
              y: 40,
              force3D: true
            });
          },
        });
        scrollTriggersRef.current.push(sectionST);
      });
      
      // 4. Images Animation for each section
      imagesRef.current.forEach((image, i) => {
        if (!image) return;
        
        gsap.set(image, { 
          opacity: 0, 
          x: i % 2 === 0 ? -40 : 40,
          scale: 0.95,
          force3D: true
        });
        
        const imageST = ScrollTrigger.create({
          trigger: image,
          start: "top 85%",
          toggleActions: "play none none reverse",
          onEnter: () => {
            gsap.to(image, {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 0.7,
              delay: i * 0.15 + 0.2,
              ease: "back.out(0.7)",
              force3D: true,
              overwrite: true,
            });
          },
          onLeaveBack: () => {
            gsap.set(image, { 
              opacity: 0, 
              x: i % 2 === 0 ? -40 : 40,
              scale: 0.95,
              force3D: true
            });
          },
        });
        scrollTriggersRef.current.push(imageST);
      });
      
      // 5. Content Animation for each section
      contentsRef.current.forEach((content, i) => {
        if (!content) return;
        
        const title = content.querySelector(".section-title");
        const description = content.querySelector(".section-description");
        const points = content.querySelectorAll(".story-point");
        
        // Set initial states
        if (title) gsap.set(title, { opacity: 0, x: 30 });
        if (description) gsap.set(description, { opacity: 0, y: 20 });
        gsap.set(points, { opacity: 0, x: 30 });
        
        const contentST = ScrollTrigger.create({
          trigger: content,
          start: "top 85%",
          toggleActions: "play none none reverse",
          onEnter: () => {
            // Title animation
            if (title) {
              gsap.to(title, {
                opacity: 1,
                x: 0,
                duration: 0.5,
                delay: i * 0.15 + 0.3,
                ease: "power2.out",
              });
            }
            
            // Description animation
            if (description) {
              gsap.to(description, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                delay: i * 0.15 + 0.35,
                ease: "power2.out",
              });
            }
            
            // Points stagger animation
            gsap.to(points, {
              opacity: 1,
              x: 0,
              stagger: 0.1,
              duration: 0.5,
              delay: i * 0.15 + 0.4,
              ease: "power2.out",
            });
          },
          onLeaveBack: () => {
            if (title) gsap.set(title, { opacity: 0, x: 30 });
            if (description) gsap.set(description, { opacity: 0, y: 20 });
            gsap.set(points, { opacity: 0, x: 30 });
          },
        });
        scrollTriggersRef.current.push(contentST);
      });
      
      // 6. Point Items Hover Animation
      document.querySelectorAll(".story-point").forEach((point) => {
        const number = point.querySelector(".point-number");
        const title = point.querySelector(".point-title");
        
        point.addEventListener("mouseenter", () => {
          if (number) {
            gsap.to(number, {
              scale: 1.1,
              duration: 0.3,
              ease: "back.out(1)",
            });
          }
          if (title) {
            gsap.to(title, {
              x: 5,
              duration: 0.3,
              ease: "power2.out",
            });
          }
        });
        
        point.addEventListener("mouseleave", () => {
          if (number) {
            gsap.to(number, {
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
            });
          }
          if (title) {
            gsap.to(title, {
              x: 0,
              duration: 0.3,
              ease: "power2.out",
            });
          }
        });
      });
      
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
    <section ref={sectionRef} className="py-10 mt-10">
      <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-10">

        {/* Header */}
        <div className="mb-14 md:mb-16">
          <span
            ref={badgeRef}
            className="inline-flex rounded-full bg-black px-4 py-2 text-sm font-semibold text-white"
          >
            {storyData.badge}
          </span>

          <h2
            ref={headingRef}
            className="mt-6 max-w-7xl text-3xl font-medium leading-tight tracking-tight text-gray-800 md:text-4xl lg:text-5xl"
          >
            {storyData.heading}
          </h2>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-20 md:space-y-24">
        {storyData.sections.map((section, i) => (
          
          // 👇 full width bg yaha apply hoga
          <div
            key={section.id}
            ref={(el) => { sectionsRef.current[i] = el; }}
            className={`${i === 1 ? "bg-[#f5f5f5] py-10" : ""}`}
          >
            <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-10">
              <div
                className={`grid items-start gap-10 lg:grid-cols-2 lg:gap-14 
                  ${section.reverse
                    ? "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1"
                    : ""
                  }`}
              >
                {/* Image */}
                <div
                  ref={(el) => { imagesRef.current[i] = el; }}
                  className="relative overflow-hidden"
                >
                  <div className="relative aspect-square w-full">
                    <Image
                      src={section.image}
                      alt={section.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </div>

                {/* Content */}
                <div
                  ref={(el) => { contentsRef.current[i] = el; }}
                  className="pt-1"
                >
                  <h3 className="section-title text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
                    {section.title}
                  </h3>
                  <p className="section-description text-lg leading-8 text-gray-500 md:text-md max-w-2xl">
                    {section.description}
                  </p>

                  <div className="mt-10 space-y-8">
                    {section.points.map((point, index) => (
                      <div
                        key={index}
                        className="story-point border-t border-gray-300 pt-8 first:border-t-0 first:pt-0"
                      >
                        <div className="flex items-start gap-4">

                          {/* Number */}
                          <div className="point-number flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-orange-500 text-sm font-semibold text-orange-500">
                            {String(index + 1).padStart(2, "0")}
                          </div>

                          {/* Text */}
                          <div>
                            <h3 className="point-title text-2xl font-medium leading-tight text-gray-800">
                              {point.title}
                            </h3>
                            <p className="mt-2 max-w-xl text-base leading-7 text-gray-500">
                              {point.description}
                            </p>
                          </div>

                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}