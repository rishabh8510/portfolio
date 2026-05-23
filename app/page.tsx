import Image from "next/image";
import Hero from "@/component/Hero";
import TechStackSlider from "@/component/TechStackSlider";
import AboutSection from "@/component/AboutSection";
import Services from "@/component/Services";
import WhyChooseMe from "@/component/WhyChooseMe";
import FeaturedProjects from "@/component/FeaturedProjects";
import WorkProcess from "@/component/WorkProcess";
import Pricing from "@/component/Pricing";
import CTASection from "@/component/CTASection";

export default function Home() {
  return (
<>
<Hero />
<TechStackSlider />
<AboutSection />
<Services />
<WhyChooseMe />
<FeaturedProjects />
<WorkProcess />
<Pricing />
<CTASection />
</>
  );
}
