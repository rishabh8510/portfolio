// import Image from "next/image";

// const AboutHeroSection = () => {
//   return (
//     <section className="w-full">
//       {/* Top Content */}
//       <div className="text-center mt-20 py-20 px-6">
        
//         {/* Badge */}
//         <div className="flex justify-center mb-6">
//           <span className="border border-gray-400 text-gray-700 text-sm px-4 py-1 rounded-full flex items-center gap-2">
//             <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
//             About Me
//           </span>
//         </div>

//         {/* Heading */}
//         <h1 className="text-4xl md:text-6xl font-semibold text-gray-800 leading-tight max-w-5xl mx-auto">
//           Crafting Digital Experiences That Inspire & Perform
//         </h1>

//         {/* Subtext */}
//         <p className="text-gray-500 mt-6 max-w-5xl mx-auto text-base md:text-lg">
// I build scalable, user-friendly web applications that turn ideas into impactful digital products.

//         </p>
//       </div>

//       {/* Image Section */}
//       <div className="relative w-full h-100 md:h-125">
//         <Image
//           src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
//           alt="Portfolio Workspace"
//           fill
//           className="object-cover"
//           priority
//         />
//       </div>
//     </section>
//   );
// };

// export default AboutHeroSection;

"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutHeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  
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
      
      // 4. Image Section Animation
      if (imageRef.current) {
        gsap.set(imageRef.current, { 
          opacity: 0, 
          scale: 0.95,
          y: 30,
          force3D: true
        });
        
        const imageST = ScrollTrigger.create({
          trigger: imageRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
          onEnter: () => {
            gsap.to(imageRef.current, {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.8,
              delay: 0.3,
              ease: "power2.out",
              force3D: true,
              overwrite: true,
            });
          },
          onLeaveBack: () => {
            gsap.set(imageRef.current, { 
              opacity: 0, 
              scale: 0.95,
              y: 30,
              force3D: true
            });
          },
        });
        scrollTriggersRef.current.push(imageST);
      }
      
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
    <section ref={sectionRef} className="w-full">
      {/* Top Content */}
      <div className="text-center mt-20 py-20 px-6">
        
        {/* Badge */}
        <div ref={badgeRef} className="flex justify-center mb-6">
          <span className="border border-gray-400 text-gray-700 text-sm px-4 py-1 rounded-full flex items-center gap-2">
            <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
            About Me
          </span>
        </div>

        {/* Heading */}
        <h1 ref={headingRef} className="text-4xl md:text-6xl font-semibold text-gray-800 leading-tight max-w-5xl mx-auto">
          Crafting Digital Experiences That Inspire & Perform
        </h1>

        {/* Subtext */}
        <p ref={subtextRef} className="text-gray-500 mt-6 max-w-5xl mx-auto text-base md:text-lg">
          I build scalable, user-friendly web applications that turn ideas into impactful digital products.
        </p>
      </div>

      {/* Image Section */}
      <div ref={imageRef} className="relative w-full h-100 md:h-125 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
          alt="Portfolio Workspace"
          fill
          className="object-cover"
          priority
        />
      </div>
    </section>
  );
};

export default AboutHeroSection;