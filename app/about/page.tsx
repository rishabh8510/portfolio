import AboutHeroSection from "@/component/aboutinfo/AboutHeroSection";
import StorySection from "@/component/aboutinfo/StorySection";
import TechStackSlider from "@/component/TechStackSlider";
import ServiceSection from "@/component/aboutinfo/ServiceSection";

export default function About(){
  return(
    <>
    <AboutHeroSection />
    <StorySection />
    <TechStackSlider />
    <ServiceSection />
    </>
  )
}