"use client";

import { useEffect, useRef } from "react";
import {
  FaReact,
  FaNodeJs,
  FaJsSquare,
} from "react-icons/fa";

import {
  SiNextdotjs,
  SiMongodb,
  SiPostgresql,
  SiTailwindcss,
  SiTypescript,
  SiHtml5,
  SiCss,
  SiBootstrap,
  SiExpress,
  SiPostman,
  SiVsco,
  SiGit,
  SiGithub,
  SiFigma,
  SiMysql,
} from "react-icons/si";
import { VscVscodeInsiders } from "react-icons/vsc";
import { SiCsswizardry } from "react-icons/si";

const techStack = [
  { name: "HTML", icon: <SiHtml5 /> },
  { name: "CSS", icon: <SiCsswizardry /> },
  { name: "Node.js", icon: <FaNodeJs /> },
  { name: "TypeScript", icon: <SiTypescript /> },

  { name: "React", icon: <FaReact /> },
  { name: "Next.js", icon: <SiNextdotjs /> },
  { name: "JavaScript", icon: <FaJsSquare /> },
  { name: "Express.js", icon: <SiExpress /> },

  { name: "MongoDB", icon: <SiMongodb /> },
  { name: "PostgreSQL", icon: <SiPostgresql /> },
  { name: "MySQL", icon: <SiMysql /> },

  { name: "Tailwind CSS", icon: <SiTailwindcss /> },
  { name: "Bootstrap", icon: <SiBootstrap /> },

  { name: "Postman", icon: <SiPostman /> },
  { name: "VS Code", icon: <VscVscodeInsiders /> },

  { name: "Git", icon: <SiGit /> },
  { name: "GitHub", icon: <SiGithub /> },
  { name: "Figma", icon: <SiFigma /> },
];

export default function TechStackSlider() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    let frame: number;
    const speed = 0.5;

    const animate = () => {
      if (el) {
        el.scrollLeft += speed;

        // smooth infinite loop reset
        if (el.scrollLeft > el.scrollWidth * 0.7) {
          el.scrollLeft = el.scrollWidth * 0.3;
        }
      }
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      ref={ref}
      className="w-full overflow-hidden whitespace-nowrap py-20"
    >
      <div className="inline-flex gap-12">
        {Array(6)
          .fill(techStack)
          .flat()
          .map((tech, index) => (
            <div
              key={index}
              className="flex flex-col items-center min-w-30 group"
            >
              <div className="text-5xl transition-transform duration-300 group-hover:scale-125">
                {tech.icon}
              </div>
              <p className="mt-3 text-sm">{tech.name}</p>
            </div>
          ))}
      </div>
    </div>
  );
}