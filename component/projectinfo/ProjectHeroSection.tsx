"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import projectData from "@/data/projects.json";

gsap.registerPlugin(ScrollTrigger);

export default function ContactHeroSection() {
  // ✅ Filter only recent projects
  const recentProjects = projectData.filter((p: any) => p.sectionBadge === "Recent Project");

  const [activeIndex, setActiveIndex] = useState(0);
  const project = recentProjects[activeIndex];

  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const bottomSectionRef = useRef<HTMLDivElement>(null);
  const topInfoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const bottomContentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);

  const scrollTriggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (badgeRef.current) {
        gsap.set(badgeRef.current, { opacity: 0, y: -20 });
        const badgeST = ScrollTrigger.create({
          trigger: badgeRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
          onEnter: () => {
            gsap.to(badgeRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });
          },
          onLeaveBack: () => {
            gsap.set(badgeRef.current, { opacity: 0, y: -20 });
          },
        });
        scrollTriggersRef.current.push(badgeST);
      }

      if (headingRef.current) {
        const headingText = headingRef.current.textContent || "";
        const words = headingText.split(" ");
        let htmlContent = "";
        words.forEach((word) => {
          htmlContent += `<span class="word inline-block mr-[0.25em]" style="display:inline-block">${word}</span> `;
        });
        headingRef.current.innerHTML = htmlContent.trim();
        const wordElements = headingRef.current.querySelectorAll<HTMLElement>(".word");
        gsap.set(wordElements, { opacity: 0, y: 30, force3D: true });
        const headingST = ScrollTrigger.create({
          trigger: headingRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
          onEnter: () => {
            gsap.to(wordElements, { opacity: 1, y: 0, stagger: 0.04, duration: 0.6, ease: "power2.out", force3D: true, overwrite: true });
          },
          onLeaveBack: () => {
            gsap.set(wordElements, { opacity: 0, y: 30, force3D: true });
          },
        });
        scrollTriggersRef.current.push(headingST);
      }

      if (subtextRef.current) {
        gsap.set(subtextRef.current, { opacity: 0, y: 20 });
        const subtextST = ScrollTrigger.create({
          trigger: subtextRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
          onEnter: () => {
            gsap.to(subtextRef.current, { opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: "power2.out" });
          },
          onLeaveBack: () => {
            gsap.set(subtextRef.current, { opacity: 0, y: 20 });
          },
        });
        scrollTriggersRef.current.push(subtextST);
      }

      if (bottomSectionRef.current) {
        gsap.set(bottomSectionRef.current, { opacity: 0, y: 40 });
        const bottomST = ScrollTrigger.create({
          trigger: bottomSectionRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
          onEnter: () => {
            gsap.to(bottomSectionRef.current, { opacity: 1, y: 0, duration: 0.7, delay: 0.3, ease: "power2.out" });
          },
          onLeaveBack: () => {
            gsap.set(bottomSectionRef.current, { opacity: 0, y: 40 });
          },
        });
        scrollTriggersRef.current.push(bottomST);
      }

      setTimeout(() => { ScrollTrigger.refresh(); }, 100);
    }, sectionRef);

    return () => {
      scrollTriggersRef.current.forEach((st) => { if (st && st.kill) st.kill(); });
      scrollTriggersRef.current = [];
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    if (!topInfoRef.current || !titleRef.current || !imageRef.current || !bottomContentRef.current || !buttonRef.current || !dotsRef.current) return;
    const tl = gsap.timeline();
    tl.to([topInfoRef.current, titleRef.current, imageRef.current, bottomContentRef.current, buttonRef.current, dotsRef.current], {
      opacity: 0, y: 20, duration: 0.3, ease: "power2.in", stagger: 0.05,
    });
    setTimeout(() => {
      tl.to([topInfoRef.current, titleRef.current, imageRef.current, bottomContentRef.current, buttonRef.current, dotsRef.current], {
        opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.08,
      });
    }, 50);
  }, [activeIndex]);

  // ✅ Safety: agar koi recent project nahi mila
  if (!project) {
    return (
      <section className="w-full text-center py-20 text-gray-400">
        No recent projects found.
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="w-full">

      {/* Top Static Section */}
      <div className="text-center mt-20 py-20 px-6">
        <div ref={badgeRef} className="flex justify-center mb-6">
          <span className="border border-gray-400 text-gray-700 text-sm px-4 py-1 rounded-full flex items-center gap-2">
            <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
            Projects
          </span>
        </div>

        <h1 ref={headingRef} className="text-4xl md:text-6xl font-semibold text-gray-800 leading-tight max-w-5xl mx-auto">
          Crafting Scalable Solutions That Define Excellence
        </h1>

        <p ref={subtextRef} className="text-gray-500 mt-6 max-w-7xl mx-auto text-base md:text-lg">
          I craft scalable, high-performance web applications that turn ideas into meaningful digital experiences.
        </p>
      </div>

      {/* Bottom Dynamic Section — sirf recent projects */}
      <div ref={bottomSectionRef} className="w-full mb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex flex-col gap-6">

            {/* Top Info */}
            <div ref={topInfoRef} className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
              <span className="inline-block bg-[#fff1eb] text-[#f97316] text-sm font-medium px-4 py-2 rounded-full">
                {project.sectionBadge}
              </span>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span className="font-semibold text-gray-800">{project.client}</span>
                <span className="w-2.5 h-2.5 bg-[#f97316] rounded-full"></span>
                <span>{project.location}</span>
                <span className="w-2.5 h-2.5 bg-[#f97316] rounded-full"></span>
                <span>{project.year}</span>
              </div>
            </div>

            {/* Title */}
            <h2 ref={titleRef} className="text-3xl md:text-4xl font-semibold text-[#17263a]">
              {project.title}
            </h2>

            {/* Image */}
            <img
              ref={imageRef}
              src={project.image}
              alt={project.title}
              className="w-full h-[280px] md:h-[420px] object-cover"
            />

            {/* Bottom Content */}
            <div ref={bottomContentRef} className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-6">
              <div>
                <span className="inline-block border border-gray-500 text-gray-700 text-sm px-4 py-2 rounded-full mb-4">
                  {project.category}
                </span>
                <p className="text-gray-500 max-w-3xl">{project.description}</p>
              </div>
              <button ref={buttonRef} className="border border-gray-600 px-6 py-3 hover:bg-[#17263a] hover:text-white transition-colors duration-300">
                {project.buttonText} →
              </button>
            </div>

            {/* ✅ Slider Dots — sirf recent projects ke liye */}
            <div ref={dotsRef} className="flex justify-center gap-3">
              {recentProjects.map((_, index) => (
                <span
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`cursor-pointer rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? "w-10 h-1 bg-orange-500"
                      : "w-5 h-1 bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}