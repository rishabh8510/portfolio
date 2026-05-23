// "use client";

// import pricing from "@/data/pricing.json";

// export default function Pricing() {
//   return (
//     <section className="bg-[#f5f5f5] py-20 px-6">
//       <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">

//         {/* Top Tag */}
//         <span className="inline-block bg-black text-white text-sm px-4 py-1 rounded-full mb-6">
//           Pricing
//         </span>

//         {/* Heading */}
//         <h2 className="text-4xl md:text-5xl font-semibold text-[#1f2c3a] mb-4">
//           Transparent Pricing for Every Project
//         </h2>

//         {/* Subtext */}
//         <p className="text-gray-500 mb-16">
//           Choose a plan that fits your budget and scope
//         </p>

//         {/* Cards */}
//         <div className="grid md:grid-cols-3 gap-8 text-left">
//           {pricing.map((plan, index) => (
//             <div
//               key={index}
//               className="border border-gray-300 p-8 bg-white"
//             >
//               {/* Title */}
//               <h3 className="text-2xl font-medium text-[#1f2c3a] mb-6">
//                 {plan.title}
//               </h3>

//               {/* Price */}
//               <p className="text-gray-500 text-sm mb-2">Start from</p>
//               <h4 className="text-3xl font-semibold text-[#1f2c3a] mb-6">
//                 {plan.price}
//                 <span className="text-lg font-normal">
//                   {plan.duration}
//                 </span>
//               </h4>

//               {/* Button */}
//               <button className="w-full bg-[#e7cfc3] text-[#1f2c3a] py-3 mb-8 hover:bg-[#dcb8a6] transition">
//                 {plan.button}
//               </button>

//               {/* Features */}
//               <h5 className="text-lg font-medium mb-4">Features</h5>
//               <ul className="space-y-3 text-gray-600 text-sm">
//                 {plan.features.map((feature, i) => (
//                   <li key={i} className="flex items-start gap-2">
//                     <span>✓</span>
//                     {feature}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>

//       </div>
//     </section>
//   );
// }


"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import pricing from "@/data/pricing.json";

gsap.registerPlugin(ScrollTrigger);

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  
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
      
      // 3. Subtext Animation
      if (subtextRef.current) {
        gsap.set(subtextRef.current, { opacity: 0, y: 30 });
        const subtextST = ScrollTrigger.create({
          trigger: subtextRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
          onEnter: () => {
            gsap.to(subtextRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: 0.1,
              ease: "power2.out",
            });
          },
          onLeaveBack: () => {
            gsap.set(subtextRef.current, { opacity: 0, y: 30 });
          },
        });
        scrollTriggersRef.current.push(subtextST);
      }
      
      // 4. Cards Staggered Animation with 3D Tilt
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        
        // Get elements inside each card
        const title = card.querySelector(".card-title");
        const price = card.querySelector(".card-price");
        const priceLabel = card.querySelector(".price-label");
        const button = card.querySelector(".card-button");
        const featuresTitle = card.querySelector(".features-title");
        const featuresList = card.querySelector(".features-list");
        
        // Set initial states
        gsap.set(card, { 
          opacity: 0, 
          y: 60,
          scale: 0.95,
          rotationX: 5,
        });
        
        if (title) gsap.set(title, { opacity: 0, y: 20 });
        if (priceLabel) gsap.set(priceLabel, { opacity: 0, y: 20 });
        if (price) gsap.set(price, { opacity: 0, y: 20 });
        if (button) gsap.set(button, { opacity: 0, scale: 0.9 });
        if (featuresTitle) gsap.set(featuresTitle, { opacity: 0, x: -20 });
        if (featuresList) {
          const features = featuresList.querySelectorAll("li");
          gsap.set(features, { opacity: 0, x: -20 });
        }
        
        const cardST = ScrollTrigger.create({
          trigger: card,
          start: "top 88%",
          toggleActions: "play none none reverse",
          onEnter: () => {
            // Main card entrance
            gsap.to(card, {
              opacity: 1,
              y: 0,
              scale: 1,
              rotationX: 0,
              duration: 0.7,
              delay: i * 0.15,
              ease: "back.out(0.8)",
            });
            
            // Title animation
            if (title) {
              gsap.to(title, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                delay: i * 0.15 + 0.1,
                ease: "power2.out",
              });
            }
            
            // Price label animation
            if (priceLabel) {
              gsap.to(priceLabel, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                delay: i * 0.15 + 0.15,
                ease: "power2.out",
              });
            }
            
            // Price animation
            if (price) {
              gsap.to(price, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                delay: i * 0.15 + 0.2,
                ease: "power2.out",
              });
            }
            
            // Button animation
            if (button) {
              gsap.to(button, {
                opacity: 1,
                scale: 1,
                duration: 0.5,
                delay: i * 0.15 + 0.25,
                ease: "back.out(0.8)",
              });
            }
            
            // Features title animation
            if (featuresTitle) {
              gsap.to(featuresTitle, {
                opacity: 1,
                x: 0,
                duration: 0.5,
                delay: i * 0.15 + 0.3,
                ease: "power2.out",
              });
            }
            
            // Features list staggered animation
            if (featuresList) {
              const features = featuresList.querySelectorAll("li");
              gsap.to(features, {
                opacity: 1,
                x: 0,
                stagger: 0.05,
                duration: 0.4,
                delay: i * 0.15 + 0.35,
                ease: "power2.out",
              });
            }
          },
          onLeaveBack: () => {
            // Reset all
            gsap.set(card, { opacity: 0, y: 60, scale: 0.95, rotationX: 5 });
            if (title) gsap.set(title, { opacity: 0, y: 20 });
            if (priceLabel) gsap.set(priceLabel, { opacity: 0, y: 20 });
            if (price) gsap.set(price, { opacity: 0, y: 20 });
            if (button) gsap.set(button, { opacity: 0, scale: 0.9 });
            if (featuresTitle) gsap.set(featuresTitle, { opacity: 0, x: -20 });
            if (featuresList) {
              const features = featuresList.querySelectorAll("li");
              gsap.set(features, { opacity: 0, x: -20 });
            }
          },
        });
        scrollTriggersRef.current.push(cardST);
      });
      
      // 5. Card Hover Animations
      cardsRef.current.forEach((card) => {
        if (!card) return;
        
        const button = card.querySelector(".card-button");
        
        card.addEventListener("mouseenter", () => {
          // Card lift effect
          gsap.to(card, {
            y: -10,
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out",
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
          });
          
          // Button pulse effect
          if (button) {
            gsap.to(button, {
              scale: 1.05,
              duration: 0.3,
              ease: "power2.out",
            });
          }
        });
        
        card.addEventListener("mouseleave", () => {
          // Reset card
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
            boxShadow: "none",
          });
          
          // Reset button
          if (button) {
            gsap.to(button, {
              scale: 1,
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
    <section ref={sectionRef} className="bg-[#f5f5f5] py-20 px-6">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">

        {/* Top Tag */}
        <span
          ref={badgeRef}
          className="inline-block bg-black text-white text-sm px-4 py-1 rounded-full mb-6"
        >
          Pricing
        </span>

        {/* Heading */}
        <h2
          ref={headingRef}
          className="text-4xl md:text-5xl font-semibold text-[#1f2c3a] mb-4"
          style={{ perspective: "800px" }}
        >
          Transparent Pricing for Every Project
        </h2>

        {/* Subtext */}
        <p ref={subtextRef} className="text-gray-500 mb-16">
          Choose a plan that fits your budget and scope
        </p>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8 text-left">
          {pricing.map((plan, index) => (
            <div
              key={index}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="border border-gray-300 p-8 bg-white transition-all duration-300"
              style={{ willChange: "transform, opacity" }}
            >
              {/* Title */}
              <h3 className="card-title text-2xl font-medium text-[#1f2c3a] mb-6">
                {plan.title}
              </h3>

              {/* Price */}
              <p className="price-label text-gray-500 text-sm mb-2">Start from</p>
              <h4 className="card-price text-3xl font-semibold text-[#1f2c3a] mb-6">
                {plan.price}
                <span className="text-lg font-normal">
                  {plan.duration}
                </span>
              </h4>

              {/* Button */}
              <button className="card-button w-full bg-[#e7cfc3] text-[#1f2c3a] py-3 mb-8 hover:bg-[#dcb8a6] transition-colors duration-300">
                {plan.button}
              </button>

              {/* Features */}
              <h5 className="features-title text-lg font-medium mb-4">Features</h5>
              <ul className="features-list space-y-3 text-gray-600 text-sm">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}