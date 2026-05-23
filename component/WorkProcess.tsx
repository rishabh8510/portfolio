// "use client";

// import Image from "next/image";
// import process from "@/data/process.json";

// export default function WorkProcess() {
//   return (
//     <section className="py-20 px-6">
//       <div className="max-w-7xl mx-auto px-6 lg:px-10 grid md:grid-cols-2 gap-16 items-start">

//         {/* LEFT SIDE */}
//         <div className="flex flex-col justify-between h-full">

//           {/* 🔼 TOP TEXT */}
//           <div>
//             <span className="inline-block bg-black text-white text-sm px-4 py-1 rounded-full mb-6">
//               How I Work
//             </span>

//             <h2 className="text-4xl md:text-5xl font-semibold text-[#1f2c3a] leading-tight mb-6">
//               My Development Process
//             </h2>

//             <p className="text-gray-600 max-w-full">
//               A well-defined process that turns ideas into powerful digital solutions, blending strategic planning, clean architecture, and modern development to deliver scalable, efficient, and impactful results.
//             </p>
//           </div>

//           {/* 🔽 BOTTOM IMAGE */}
//           <div className="relative w-full h-70">
//             <Image
//               src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop"
//               alt="Development Process"
//               fill
//               className="object-cover"
//             />
//           </div>

//         </div>

//         {/* RIGHT SIDE */}
//         <div className="flex flex-col gap-10">
//           {process.map((item, index) => (
//             <div key={index} className="border-b border-gray-300 pb-8">

//               {/* Top Row */}
//               <div className="flex justify-between items-center mb-4">
//                 <span className="text-lg font-medium text-gray-800">
//                   {item.id}
//                   <span className="text-gray-400">/(03)</span>
//                 </span>

//                 <span className="text-xl">→</span>
//               </div>

//               {/* Title */}
//               <h3 className="text-2xl font-semibold text-[#1f2c3a] mb-3">
//                 {item.title}
//               </h3>

//               {/* Description */}
//               <p className="text-gray-600 text-sm leading-relaxed">
//                 {item.description}
//               </p>

//             </div>
//           ))}
//         </div>

//       </div>
//     </section>
//   );
// }


"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import process from "@/data/process.json";

gsap.registerPlugin(ScrollTrigger);

export default function WorkProcess() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const leftParaRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const processItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  
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
              duration: 0.6,
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
              stagger: 0.04,
              duration: 0.7,
              ease: "power2.out",
            });
          },
          onLeaveBack: () => {
            gsap.set(wordElements, { opacity: 0, y: 40, rotateX: -10 });
          },
        });
        scrollTriggersRef.current.push(headingST);
      }
      
      // 3. Left Paragraph Animation
      if (leftParaRef.current) {
        gsap.set(leftParaRef.current, { opacity: 0, y: 30 });
        const paraST = ScrollTrigger.create({
          trigger: leftParaRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
          onEnter: () => {
            gsap.to(leftParaRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: 0.1,
              ease: "power2.out",
            });
          },
          onLeaveBack: () => {
            gsap.set(leftParaRef.current, { opacity: 0, y: 30 });
          },
        });
        scrollTriggersRef.current.push(paraST);
      }
      
      // 4. Image Animation
      if (imageRef.current) {
        gsap.set(imageRef.current, { opacity: 0, scale: 0.95, x: -20 });
        const imageST = ScrollTrigger.create({
          trigger: imageRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
          onEnter: () => {
            gsap.to(imageRef.current, {
              opacity: 1,
              scale: 1,
              x: 0,
              duration: 0.8,
              delay: 0.2,
              ease: "back.out(0.7)",
            });
          },
          onLeaveBack: () => {
            gsap.set(imageRef.current, { opacity: 0, scale: 0.95, x: -20 });
          },
        });
        scrollTriggersRef.current.push(imageST);
      }
      
      // 5. Process Items Staggered Animation
      processItemsRef.current.forEach((item, i) => {
        if (!item) return;
        
        // Get elements inside each item
        const topRow = item.querySelector(".top-row");
        const title = item.querySelector(".process-title");
        const description = item.querySelector(".process-description");
        
        // Set initial states
        gsap.set(item, { opacity: 0, x: 50 });
        
        if (topRow) gsap.set(topRow, { opacity: 0, x: 20 });
        if (title) gsap.set(title, { opacity: 0, y: 20 });
        if (description) gsap.set(description, { opacity: 0, y: 20 });
        
        const itemST = ScrollTrigger.create({
          trigger: item,
          start: "top 88%",
          toggleActions: "play none none reverse",
          onEnter: () => {
            // Animate main container
            gsap.to(item, {
              opacity: 1,
              x: 0,
              duration: 0.6,
              delay: i * 0.1,
              ease: "power2.out",
            });
            
            // Animate top row
            if (topRow) {
              gsap.to(topRow, {
                opacity: 1,
                x: 0,
                duration: 0.5,
                delay: i * 0.1 + 0.1,
                ease: "power2.out",
              });
            }
            
            // Animate title
            if (title) {
              gsap.to(title, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                delay: i * 0.1 + 0.15,
                ease: "power2.out",
              });
            }
            
            // Animate description
            if (description) {
              gsap.to(description, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                delay: i * 0.1 + 0.2,
                ease: "power2.out",
              });
            }
          },
          onLeaveBack: () => {
            // Reset all
            gsap.set(item, { opacity: 0, x: 50 });
            if (topRow) gsap.set(topRow, { opacity: 0, x: 20 });
            if (title) gsap.set(title, { opacity: 0, y: 20 });
            if (description) gsap.set(description, { opacity: 0, y: 20 });
          },
        });
        scrollTriggersRef.current.push(itemST);
      });
      
      // 6. Hover Animation for Process Items
      processItemsRef.current.forEach((item) => {
        if (!item) return;
        
        const arrow = item.querySelector(".process-arrow");
        const title = item.querySelector(".process-title");
        
        item.addEventListener("mouseenter", () => {
          if (arrow) {
            gsap.to(arrow, {
              x: 8,
              rotation: 360,
              duration: 0.4,
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
        
        item.addEventListener("mouseleave", () => {
          if (arrow) {
            gsap.to(arrow, {
              x: 0,
              rotation: 0,
              duration: 0.4,
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
    <section ref={sectionRef} className="py-20 px-6">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid md:grid-cols-2 gap-16 items-start">

        {/* LEFT SIDE */}
        <div className="flex flex-col justify-between h-full">

          {/* 🔼 TOP TEXT */}
          <div>
            <span
              ref={badgeRef}
              className="inline-block bg-black text-white text-sm px-4 py-1 rounded-full mb-6"
            >
              How I Work
            </span>

            <h2
              ref={headingRef}
              className="text-4xl md:text-5xl font-semibold text-[#1f2c3a] leading-tight mb-6"
              style={{ perspective: "800px" }}
            >
              My Development Process
            </h2>

            <p ref={leftParaRef} className="text-gray-600 max-w-full">
              A well-defined process that turns ideas into powerful digital solutions, blending strategic planning, clean architecture, and modern development to deliver scalable, efficient, and impactful results.
            </p>
          </div>

          {/* 🔽 BOTTOM IMAGE */}
          <div
            ref={imageRef}
            className="relative w-full h-70 overflow-hidden rounded-lg"
          >
            <Image
              src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop"
              alt="Development Process"
              fill
              className="object-cover"
            />
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col gap-10">
          {process.map((item, index) => (
            <div
              key={index}
              ref={(el) => { processItemsRef.current[index] = el; }}
              className="border-b border-gray-300 pb-8 cursor-pointer"
            >
              {/* Top Row */}
              <div className="top-row flex justify-between items-center mb-4">
                <span className="text-lg font-medium text-gray-800">
                  {item.id}
                  <span className="text-gray-400">/(03)</span>
                </span>

                <span className="process-arrow text-xl inline-block">→</span>
              </div>

              {/* Title */}
              <h3 className="process-title text-2xl font-semibold text-[#1f2c3a] mb-3">
                {item.title}
              </h3>

              {/* Description */}
              <p className="process-description text-gray-600 text-sm leading-relaxed">
                {item.description}
              </p>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}