"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import projects from "@/data/projects.json";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedProjects() {
  // Filter featured projects first, then take first 4
  const featuredProjects = projects.filter((p: any) => p.sectionBadge === "Featured Work");
  const visibleProjects = featuredProjects.slice(0, 4);

  const [current, setCurrent] = useState(0);

  // Refs for GSAP
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const yearRef = useRef<HTMLParagraphElement>(null);
  const clientRef = useRef<HTMLParagraphElement>(null);
  
  // Store ScrollTriggers for cleanup
  const scrollTriggersRef = useRef<ScrollTrigger[]>([]);

  // Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % visibleProjects.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [visibleProjects.length]);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Header Animation - Title & Description
      if (headerRef.current) {
        const title = headerRef.current.querySelector("h2");
        const description = headerRef.current.querySelector("p");
        
        if (title) {
          gsap.set(title, { opacity: 0, x: -40 });
          const titleST = ScrollTrigger.create({
            trigger: title,
            start: "top 85%",
            toggleActions: "play none none reverse",
            onEnter: () => {
              gsap.to(title, {
                opacity: 1,
                x: 0,
                duration: 0.7,
                ease: "power2.out",
              });
            },
            onLeaveBack: () => {
              gsap.set(title, { opacity: 0, x: -40 });
            },
          });
          scrollTriggersRef.current.push(titleST);
        }
        
        if (description) {
          gsap.set(description, { opacity: 0, x: 40 });
          const descST = ScrollTrigger.create({
            trigger: description,
            start: "top 85%",
            toggleActions: "play none none reverse",
            onEnter: () => {
              gsap.to(description, {
                opacity: 1,
                x: 0,
                duration: 0.7,
                delay: 0.2,
                ease: "power2.out",
              });
            },
            onLeaveBack: () => {
              gsap.set(description, { opacity: 0, x: 40 });
            },
          });
          scrollTriggersRef.current.push(descST);
        }
      }
      
      // 2. Image Container Animation
      if (imageContainerRef.current) {
        gsap.set(imageContainerRef.current, { opacity: 0, scale: 0.95, x: -30 });
        const imageST = ScrollTrigger.create({
          trigger: imageContainerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
          onEnter: () => {
            gsap.to(imageContainerRef.current, {
              opacity: 1,
              scale: 1,
              x: 0,
              duration: 0.8,
              delay: 0.3,
              ease: "back.out(0.7)",
            });
          },
          onLeaveBack: () => {
            gsap.set(imageContainerRef.current, { opacity: 0, scale: 0.95, x: -30 });
          },
        });
        scrollTriggersRef.current.push(imageST);
      }
      
      // 3. Text Elements Animation (Individual elements)
      if (categoryRef.current) {
        gsap.set(categoryRef.current, { opacity: 0, y: 30 });
        const categoryST = ScrollTrigger.create({
          trigger: categoryRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
          onEnter: () => {
            gsap.to(categoryRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: 0.4,
              ease: "power2.out",
            });
          },
          onLeaveBack: () => {
            gsap.set(categoryRef.current, { opacity: 0, y: 30 });
          },
        });
        scrollTriggersRef.current.push(categoryST);
      }
      
      if (titleRef.current) {
        gsap.set(titleRef.current, { opacity: 0, y: 30 });
        const titleST = ScrollTrigger.create({
          trigger: titleRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
          onEnter: () => {
            gsap.to(titleRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: 0.5,
              ease: "power2.out",
            });
          },
          onLeaveBack: () => {
            gsap.set(titleRef.current, { opacity: 0, y: 30 });
          },
        });
        scrollTriggersRef.current.push(titleST);
      }
      
      if (yearRef.current) {
        gsap.set(yearRef.current, { opacity: 0, y: 30 });
        const yearST = ScrollTrigger.create({
          trigger: yearRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
          onEnter: () => {
            gsap.to(yearRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: 0.6,
              ease: "power2.out",
            });
          },
          onLeaveBack: () => {
            gsap.set(yearRef.current, { opacity: 0, y: 30 });
          },
        });
        scrollTriggersRef.current.push(yearST);
      }
      
      if (clientRef.current) {
        gsap.set(clientRef.current, { opacity: 0, y: 30 });
        const clientST = ScrollTrigger.create({
          trigger: clientRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
          onEnter: () => {
            gsap.to(clientRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: 0.7,
              ease: "power2.out",
            });
          },
          onLeaveBack: () => {
            gsap.set(clientRef.current, { opacity: 0, y: 30 });
          },
        });
        scrollTriggersRef.current.push(clientST);
      }
      
      // 4. Pagination Animation
      if (paginationRef.current) {
        gsap.set(paginationRef.current, { opacity: 0, y: 20 });
        const paginationST = ScrollTrigger.create({
          trigger: paginationRef.current,
          start: "top 88%",
          toggleActions: "play none none reverse",
          onEnter: () => {
            gsap.to(paginationRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: 0.8,
              ease: "power2.out",
            });
          },
          onLeaveBack: () => {
            gsap.set(paginationRef.current, { opacity: 0, y: 20 });
          },
        });
        scrollTriggersRef.current.push(paginationST);
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
  
  // Animation when project changes
  useEffect(() => {
    if (!imageRef.current) return;
    
    // Fade out image
    const tl = gsap.timeline();
    
    tl.to(imageRef.current, {
      opacity: 0,
      scale: 0.98,
      duration: 0.3,
      ease: "power2.in",
    });
    
    // Fade in new image
    setTimeout(() => {
      tl.to(imageRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "power2.out",
      });
    }, 50);
    
  }, [current]);

  const project = visibleProjects[current];

  return (
    <section ref={sectionRef} className="bg-[#1f2c3a] text-white py-20 px-6">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row justify-between mb-12">
          <h2 className="text-4xl font-semibold">Featured Projects</h2>
          <p className="text-gray-300 max-w-lg mt-4 md:mt-0">
            A curated collection of projects demonstrating my expertise in building efficient and user-focused digital solutions.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-12 gap-10 items-start">

          {/* Image Section */}
          <div 
            ref={imageContainerRef} 
            className="relative md:col-span-7 w-full h-[420px] overflow-hidden"
          >
            <div ref={imageRef} className="relative w-full h-full">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />

              {/* Overlay */}
              <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/70 to-transparent text-sm">
                {project.description}
              </div>
            </div>
          </div>

          {/* Text Section */}
          <div ref={textContainerRef} className="md:col-span-5">
            <span ref={categoryRef} className="border border-white px-4 py-1 rounded-full text-sm inline-block">
              {project.category}
            </span>

            <h3 ref={titleRef} className="text-3xl mt-4 font-medium leading-snug">
              {project.title}
            </h3>

            <p ref={yearRef} className="text-gray-400 mt-2">{project.year}</p>
            <p ref={clientRef} className="text-gray-400">{project.client}</p>

            {/* Pagination */}
            <div ref={paginationRef} className="flex items-center gap-6 mt-10">
              {visibleProjects.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setCurrent(index)}
                  className="cursor-pointer flex flex-col items-center group"
                >
                  <div
                    className={`h-[2px] w-16 transition-all duration-300 ${
                      current === index ? "bg-white" : "bg-gray-500 group-hover:bg-gray-400"
                    }`}
                  />
                  <span
                    className={`text-sm mt-2 transition-all duration-300 ${
                      current === index ? "text-white" : "text-gray-500 group-hover:text-gray-400"
                    }`}
                  >
                    {item.id}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}