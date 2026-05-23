"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import projectsData from "../../data/projects.json"; // JSON file import

gsap.registerPlugin(ScrollTrigger);

// ─── Type Definition ────────────────────────────────────────────────────────
interface Project {
  id: number;
  sectionBadge: string;
  title: string;
  year: string;
  client: string;
  location: string;
  category: string;
  description: string;
  image: string;
  buttonText: string;
}

// Cast imported data to Project[]
const projects: Project[] = projectsData as Project[];

// ─── Categories derived from data (+ "All Projects") ──────────────────────
const ALL = "All Projects";
const categories: string[] = [
  ALL,
  ...Array.from(new Set(projects.map((p) => p.category))),
];

// ─── Constants ─────────────────────────────────────────────────────────────
const ITEMS_PER_SLIDE = 3;
const AUTO_SLIDE_INTERVAL = 3500;

// ─── ProjectCard ───────────────────────────────────────────────────────────
function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (cardRef.current) {
      gsap.set(cardRef.current, { opacity: 0, y: 30 });
      
      const cardST = ScrollTrigger.create({
        trigger: cardRef.current,
        start: "top 88%",
        toggleActions: "play none none reverse",
        onEnter: () => {
         gsap.to(cardRef.current, {
           opacity: 1,
           y: 0,
           duration: 0.5,
           ease: "power2.out",
           force3D: true,
           overwrite: true,
         });
        },
        onLeaveBack: () => {
          gsap.set(cardRef.current, { opacity: 0, y: 30 });
        },
      });
      
      return () => cardST.kill();
    }
  }, []);
  
  return (
    <article ref={cardRef} className="group flex flex-col">
      <div className="overflow-hidden bg-zinc-100">
        <img
          src={project.image}
          alt={project.title}
          className="h-[220px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[260px]"
          loading="lazy"
        />
      </div>

      <div className="flex flex-col gap-4 pt-5">
        {/* Title */}
        <h3 className="text-[22px] font-medium leading-tight tracking-tight text-neutral-900 sm:text-[26px]">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm leading-relaxed text-neutral-500 line-clamp-2">
          {project.description}
        </p>

        {/* Meta row */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-neutral-400">
              {project.client} · {project.year}
            </span>
          </div>
          <button className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-orange-500 transition hover:text-orange-600">
            See Details
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  );
}

// ─── ProjectsSection ───────────────────────────────────────────────────────
export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<string>(ALL);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  // Store ScrollTriggers for cleanup
  const scrollTriggersRef = useRef<ScrollTrigger[]>([]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        activeCategory === ALL || project.category === activeCategory;
      const matchesSearch = project.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase().trim());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const totalSlides = Math.ceil(filteredProjects.length / ITEMS_PER_SLIDE);

  // Reset slide when filter / search changes
  useEffect(() => {
    setCurrentSlide(0);
  }, [activeCategory, searchQuery]);

  const goToNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const goToPrev = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Auto-slide
  useEffect(() => {
    if (totalSlides <= 1) return;
    intervalRef.current = setInterval(goToNext, AUTO_SLIDE_INTERVAL);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [goToNext, totalSlides]);

  const pauseAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };
  const resumeAutoSlide = () => {
    if (totalSlides <= 1) return;
    intervalRef.current = setInterval(goToNext, AUTO_SLIDE_INTERVAL);
  };

  const visibleProjects = filteredProjects.slice(
    currentSlide * ITEMS_PER_SLIDE,
    currentSlide * ITEMS_PER_SLIDE + ITEMS_PER_SLIDE
  );

  // GSAP Animations
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
      
      // 3. Filter Section Animation
      if (filterRef.current) {
        gsap.set(filterRef.current, { opacity: 0, y: 20 });
        const filterST = ScrollTrigger.create({
          trigger: filterRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
          onEnter: () => {
            gsap.to(filterRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: 0.2,
              ease: "power2.out",
            });
          },
          onLeaveBack: () => {
            gsap.set(filterRef.current, { opacity: 0, y: 20 });
          },
        });
        scrollTriggersRef.current.push(filterST);
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
    <section ref={sectionRef} className="px-4 py-16 text-neutral-900 sm:px-6 lg:px-10 xl:px-14 xl:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">

        {/* Badge */}
        <div ref={badgeRef} className="mb-8 inline-flex rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-500">
          My Projects
        </div>

        {/* Heading + Nav Buttons */}
        <div className="flex items-end justify-between">
          <h2 ref={headingRef} className="max-w-4xl text-4xl font-medium leading-tight tracking-tight text-neutral-900">
            My Project Portfolio
          </h2>

          {totalSlides > 1 && (
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  goToPrev();
                  pauseAutoSlide();
                  resumeAutoSlide();
                }}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 text-neutral-600 transition hover:border-orange-500 hover:text-orange-500"
                aria-label="Previous"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => {
                  goToNext();
                  pauseAutoSlide();
                  resumeAutoSlide();
                }}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 text-neutral-600 transition hover:border-orange-500 hover:text-orange-500"
                aria-label="Next"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>

        {/* Filters + Search */}
        <div ref={filterRef} className="mt-10 flex flex-col gap-6 border-b border-neutral-300 pb-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-wrap gap-x-7 gap-y-3">
            {categories.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`border-b pb-2 text-sm transition ${
                    isActive
                      ? "border-orange-500 text-neutral-900"
                      : "border-transparent text-neutral-500 hover:text-neutral-900"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <label className="flex w-full items-center gap-3 border-b border-neutral-400 pb-2 text-sm text-neutral-500 lg:max-w-[280px]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Project..."
              className="w-full bg-transparent outline-none placeholder:text-neutral-400"
            />
            <Search className="h-4 w-4 shrink-0 text-neutral-500" />
          </label>
        </div>

        {/* Slider */}
        {filteredProjects.length > 0 ? (
          <div
            ref={sliderRef}
            className="mt-12 lg:mt-16"
            onMouseEnter={pauseAutoSlide}
            onMouseLeave={resumeAutoSlide}
          >
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {visibleProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>

            {totalSlides > 1 && (
              <div className="mt-10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalSlides }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentSlide(i)}
                      className={`rounded-full transition-all duration-300 ${
                        i === currentSlide
                          ? "h-2.5 w-8 bg-orange-500"
                          : "h-2.5 w-2.5 bg-neutral-300 hover:bg-neutral-400"
                      }`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-neutral-400">
                  <span className="font-medium text-neutral-800">
                    {String(currentSlide + 1).padStart(2, "0")}
                  </span>{" "}
                  / {String(totalSlides).padStart(2, "0")}
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="mt-12 rounded-3xl border border-dashed border-neutral-300 px-6 py-14 text-center text-neutral-500">
            No project found for this filter.
          </div>
        )}
      </div>
    </section>
  );
}