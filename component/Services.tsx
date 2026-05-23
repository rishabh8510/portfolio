"use client";

import Image from "next/image";
import services from "@/data/services.json";
import { useEffect, useRef, useLayoutEffect } from "react";
import gsap from "gsap";

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const tagRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subTextRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  let lastScrollY = useRef(0); // Track last scroll position

  const animateIn = () => {
    // Kill any existing animations
    gsap.killTweensOf([
      tagRef.current,
      headingRef.current,
      subTextRef.current,
      ...cardsRef.current
    ]);

    // Reset styles
    gsap.set([tagRef.current, headingRef.current, subTextRef.current], {
      opacity: 0,
      y: 40
    });

    cardsRef.current.forEach((card) => {
      if (card) {
        gsap.set(card, {
          opacity: 0,
          y: 60,
          scale: 0.9
        });
      }
    });

    // Animate in sequence
    const masterTl = gsap.timeline();
    
    masterTl
      .to(tagRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "back.out(1)"
      })
      .to(headingRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "back.out(1)"
      }, "-=0.3")
      .to(subTextRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "back.out(1)"
      }, "-=0.3")
      .to(cardsRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: "back.out(0.8)"
      }, "-=0.2");
  };

  // useLayoutEffect runs before the browser paints
  useLayoutEffect(() => {
    animateIn();
  }, []);

  useEffect(() => {
    // Setup Intersection Observer for when user returns to this section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const currentScrollY = window.scrollY;
          const isScrollingDown = currentScrollY > lastScrollY.current;
          
          if (entry.isIntersecting) {
            // Only animate when scrolling DOWN (top to bottom)
            if (isScrollingDown) {
              animateIn();
            }
          }
          
          lastScrollY.current = currentScrollY;
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Setup hover animations
    const setupHoverEffects = () => {
      cardsRef.current.forEach((card) => {
        if (!card) return;
        
        const image = card.querySelector('.service-image');
        const title = card.querySelector('.service-title');
        
        const onMouseEnter = () => {
          gsap.to(card, {
            y: -12,
            duration: 0.4,
            ease: "elastic.out(1, 0.5)",
            boxShadow: "0 25px 35px -12px rgba(0,0,0,0.2)"
          });
          if (image) {
            gsap.to(image, { scale: 1.08, duration: 0.4 });
          }
          if (title) {
            gsap.to(title, { color: "#f97316", duration: 0.3 });
          }
        };
        
        const onMouseLeave = () => {
          gsap.to(card, {
            y: 0,
            duration: 0.4,
            ease: "elastic.out(1, 0.3)",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
          });
          if (image) {
            gsap.to(image, { scale: 1, duration: 0.4 });
          }
          if (title) {
            gsap.to(title, { color: "#1f2937", duration: 0.3 });
          }
        };
        
        card.addEventListener("mouseenter", onMouseEnter);
        card.addEventListener("mouseleave", onMouseLeave);
        
        return () => {
          card.removeEventListener("mouseenter", onMouseEnter);
          card.removeEventListener("mouseleave", onMouseLeave);
        };
      });
    };

    setupHoverEffects();

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="bg-[#f5f5f5] py-20 px-6"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
        
        <span 
          ref={tagRef}
          className="inline-block bg-black text-white text-sm px-4 py-1 rounded-full mb-6"
        >
          IT Services
        </span>

        <h2 
          ref={headingRef}
          className="text-4xl md:text-5xl font-semibold text-gray-800 mb-6"
        >
          Smart Digital Solutions for Your Business
        </h2>

        <p 
          ref={subTextRef}
          className="text-gray-500 max-w-2xl mx-auto mb-16"
        >
          We deliver cutting-edge IT services including web development, cloud solutions,
          and digital transformation to help your business grow faster and smarter.
        </p>

        <div className="grid md:grid-cols-3 gap-10 text-left">
          {services.map((item, index) => (
            <div 
              key={index}
              ref={el => {
                if (el) cardsRef.current[index] = el;
              }}
              className="bg-white overflow-hidden"
            >
              <div className="relative w-full h-64 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover service-image"
                />
              </div>
              <div className="p-6">
                <p className="text-orange-500 mb-3 text-sm font-semibold">{item.id}</p>
                <h3 className="text-xl font-semibold text-gray-800 mb-3 service-title">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}