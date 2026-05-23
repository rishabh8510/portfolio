// const ContactHeroSection = () => {
//   return (
//     <section className="w-full">
//       {/* Top Content */}
//       <div className="text-center mt-20 py-20 px-6">
//         {/* Badge */}
//         <div className="flex justify-center mb-6">
//           <span className="border border-gray-400 text-gray-700 text-sm px-4 py-1 rounded-full flex items-center gap-2">
//             <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
//             Contact Me
//           </span>
//         </div>

//         {/* Heading */}
//         <h1 className="text-4xl md:text-6xl font-semibold text-gray-800 leading-tight max-w-5xl mx-auto">
//           Crafting Digital Experiences That Inspire &amp; Perform
//         </h1>

//         {/* Subtext */}
//         <p className="text-gray-500 mt-6 max-w-5xl mx-auto text-base md:text-lg">
//           I build scalable, user-friendly web applications that turn ideas into
//           impactful digital products.
//         </p>
//       </div>

//       {/* Contact Section */}
//       <div className="w-full bg-[#17263a]">
//         <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
//             {/* Left Side Details */}
//             <div className="text-white">
//               <div className="mb-6">
//                 <span className="inline-block bg-white text-[#f97316] text-sm font-medium px-4 py-2 rounded-full">
//                   Contact Details
//                 </span>
//               </div>

//               <h2 className="text-4xl md:text-6xl font-semibold leading-tight">
//                 Let&apos;s Work Together
//               </h2>

//               <p className="text-gray-300 mt-6 max-w-xl text-base md:text-lg leading-relaxed">
//                 Whether you have a question, need more details about our
//                 services, or want to discuss a potential collaboration,
//                 we&apos;re here to help.
//               </p>

//               <div className="mt-12 space-y-8">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-white/20 pt-8">
//                   <div>
//                     <h3 className="text-2xl font-medium text-gray-300 mb-3">
//                       Message Us
//                     </h3>
//                     <p className="text-white font-semibold break-all">
//                       contact@bricknetbuilds.com
//                     </p>
//                   </div>

//                   <div>
//                     <h3 className="text-2xl font-medium text-gray-300 mb-3">
//                       Call Us
//                     </h3>
//                     <p className="text-white font-semibold">(555) 483-2190</p>
//                   </div>
//                 </div>

//                 <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
//                   <h3 className="text-2xl font-medium text-gray-300 min-w-[160px]">
//                     Location
//                   </h3>
//                   <p className="text-white font-semibold max-w-md">
//                     82 Westfield Industrial Blvd, San Diego, CA 92101
//                   </p>
//                 </div>

//                 <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
//                   <h3 className="text-2xl font-medium text-gray-300 min-w-[160px]">
//                     Business Hours
//                   </h3>
//                   <div className="text-white font-semibold space-y-2">
//                     <p>Monday - Friday, 8:00 AM - 6:00 PM</p>
//                     <p>Saturday: 9:00 AM - 2:00 PM</p>
//                     <p>Sunday: Closed</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Right Side Form */}
//             <div className="bg-[#f5f5f5] p-6 md:p-8 lg:p-10 shadow-lg">
//               <h2 className="text-3xl md:text-4xl font-semibold text-center text-[#17263a] mb-10">
//                 Send Us Message!
//               </h2>

//               <form className="space-y-6">
//                 <div>
//                   <label className="block text-sm font-semibold text-[#17263a] mb-2">
//                     Full Name*
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="Your name"
//                     className="w-full border border-gray-300 px-4 py-3 bg-transparent outline-none focus:border-[#f97316]"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-[#17263a] mb-2">
//                     Email Address*
//                   </label>
//                   <input
//                     type="email"
//                     placeholder="Your email"
//                     className="w-full border border-gray-300 px-4 py-3 bg-transparent outline-none focus:border-[#f97316]"
//                   />
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-semibold text-[#17263a] mb-2">
//                       Phone Number*
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="Your phone number"
//                       className="w-full border border-gray-300 px-4 py-3 bg-transparent outline-none focus:border-[#f97316]"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-semibold text-[#17263a] mb-2">
//                       Project Type*
//                     </label>
//                     <select className="w-full border border-gray-300 px-4 py-3 bg-transparent outline-none focus:border-[#f97316]">
//                       <option>Select project type</option>
//                       <option>Web Design</option>
//                       <option>Web Development</option>
//                       <option>UI/UX Design</option>
//                       <option>E-commerce</option>
//                     </select>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-[#17263a] mb-2">
//                     Message*
//                   </label>
//                   <textarea
//                     rows={6}
//                     placeholder="Tell us about your project..."
//                     className="w-full border border-gray-300 px-4 py-3 bg-transparent outline-none resize-none focus:border-[#f97316]"
//                   ></textarea>
//                 </div>

//                 <button
//                   type="submit"
//                   className="bg-[#ff5a2f] hover:bg-[#e44d24] text-white font-semibold px-8 py-4 inline-flex items-center gap-3 transition"
//                 >
//                   Send Message
//                   <span className="text-xl">→</span>
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ContactHeroSection;


"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import toast, { Toaster } from "react-hot-toast";

gsap.registerPlugin(ScrollTrigger);

const ContactHeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const contactLeftRef = useRef<HTMLDivElement>(null);
  const contactDetailsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const formTitleRef = useRef<HTMLHeadingElement>(null);
  const formFieldsRef = useRef<(HTMLDivElement | null)[]>([]);
  const submitBtnRef = useRef<HTMLButtonElement>(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
  });

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

      if (contactLeftRef.current) {
        gsap.set(contactLeftRef.current, { opacity: 0, x: -30 });
        const leftST = ScrollTrigger.create({
          trigger: contactLeftRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
          onEnter: () => {
            gsap.to(contactLeftRef.current, { opacity: 1, x: 0, duration: 0.7, delay: 0.3, ease: "power2.out" });
          },
          onLeaveBack: () => {
            gsap.set(contactLeftRef.current, { opacity: 0, x: -30 });
          },
        });
        scrollTriggersRef.current.push(leftST);
      }

      if (contactDetailsRef.current) {
        const details = contactDetailsRef.current.children;
        gsap.set(details, { opacity: 0, y: 20 });
        const detailsST = ScrollTrigger.create({
          trigger: contactDetailsRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
          onEnter: () => {
            gsap.to(details, { opacity: 1, y: 0, stagger: 0.1, duration: 0.5, delay: 0.4, ease: "power2.out" });
          },
          onLeaveBack: () => {
            gsap.set(details, { opacity: 0, y: 20 });
          },
        });
        scrollTriggersRef.current.push(detailsST);
      }

      if (formRef.current) {
        gsap.set(formRef.current, { opacity: 0, x: 30 });
        const formST = ScrollTrigger.create({
          trigger: formRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
          onEnter: () => {
            gsap.to(formRef.current, { opacity: 1, x: 0, duration: 0.7, delay: 0.3, ease: "power2.out" });
          },
          onLeaveBack: () => {
            gsap.set(formRef.current, { opacity: 0, x: 30 });
          },
        });
        scrollTriggersRef.current.push(formST);
      }

      if (formTitleRef.current) {
        gsap.set(formTitleRef.current, { opacity: 0, y: 20 });
        const titleST = ScrollTrigger.create({
          trigger: formTitleRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
          onEnter: () => {
            gsap.to(formTitleRef.current, { opacity: 1, y: 0, duration: 0.5, delay: 0.4, ease: "power2.out" });
          },
          onLeaveBack: () => {
            gsap.set(formTitleRef.current, { opacity: 0, y: 20 });
          },
        });
        scrollTriggersRef.current.push(titleST);
      }

      formFieldsRef.current.forEach((field, i) => {
        if (!field) return;
        gsap.set(field, { opacity: 0, y: 20 });
        const fieldST = ScrollTrigger.create({
          trigger: field,
          start: "top 88%",
          toggleActions: "play none none reverse",
          onEnter: () => {
            gsap.to(field, { opacity: 1, y: 0, duration: 0.5, delay: i * 0.08 + 0.5, ease: "power2.out" });
          },
          onLeaveBack: () => {
            gsap.set(field, { opacity: 0, y: 20 });
          },
        });
        scrollTriggersRef.current.push(fieldST);
      });

      if (submitBtnRef.current) {
        gsap.set(submitBtnRef.current, { opacity: 0, scale: 0.95 });
        const btnST = ScrollTrigger.create({
          trigger: submitBtnRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
          onEnter: () => {
            gsap.to(submitBtnRef.current, { opacity: 1, scale: 1, duration: 0.5, delay: 0.8, ease: "back.out(0.8)" });
          },
          onLeaveBack: () => {
            gsap.set(submitBtnRef.current, { opacity: 0, scale: 0.95 });
          },
        });
        scrollTriggersRef.current.push(btnST);
      }

      if (submitBtnRef.current) {
        const handleMouseEnter = () => {
          if (submitBtnRef.current) {
            const arrow = submitBtnRef.current.querySelector("span");
            gsap.to(submitBtnRef.current, { scale: 1.02, duration: 0.25, ease: "power2.out" });
            if (arrow) gsap.to(arrow, { x: 5, duration: 0.25, ease: "power2.out" });
          }
        };
        const handleMouseLeave = () => {
          if (submitBtnRef.current) {
            const arrow = submitBtnRef.current.querySelector("span");
            gsap.to(submitBtnRef.current, { scale: 1, duration: 0.25, ease: "power2.out" });
            if (arrow) gsap.to(arrow, { x: 0, duration: 0.25, ease: "power2.out" });
          }
        };
        submitBtnRef.current.addEventListener("mouseenter", handleMouseEnter);
        submitBtnRef.current.addEventListener("mouseleave", handleMouseLeave);
        (submitBtnRef.current as any)._cleanupHover = () => {
          if (submitBtnRef.current) {
            submitBtnRef.current.removeEventListener("mouseenter", handleMouseEnter);
            submitBtnRef.current.removeEventListener("mouseleave", handleMouseLeave);
          }
        };
      }

      setTimeout(() => { ScrollTrigger.refresh(); }, 100);

    }, sectionRef);

    return () => {
      if (submitBtnRef.current && (submitBtnRef.current as any)._cleanupHover) {
        (submitBtnRef.current as any)._cleanupHover();
        delete (submitBtnRef.current as any)._cleanupHover;
      }
      scrollTriggersRef.current.forEach((st) => { if (st && st.kill) st.kill(); });
      scrollTriggersRef.current = [];
      ctx.revert();
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // ✅ Loading toast
    const loadingToast = toast.loading("Sending your message...", {
      style: {
        background: "#17263a",
        color: "#fff",
        borderRadius: "8px",
        padding: "14px 20px",
        fontSize: "14px",
      },
    });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      toast.dismiss(loadingToast);

      if (data.success) {
        // ✅ Success toast
        toast.custom((t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } flex items-start gap-4 bg-white shadow-2xl rounded-xl px-5 py-4 max-w-sm w-full border-l-4 border-[#ff5a2f]`}
          >
            {/* Icon */}
            <div className="flex-shrink-0 w-10 h-10 bg-[#fff0eb] rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-[#ff5a2f]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            {/* Text */}
            <div className="flex-1 pt-0.5">
              <p className="text-sm font-bold text-[#17263a]">Message Sent!</p>
              <p className="text-sm text-gray-500 mt-0.5">
                {data.message || "We'll get back to you soon."}
              </p>
            </div>

            {/* Close Button */}
            <button
              onClick={() => toast.dismiss(t.id)}
              className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors mt-0.5"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ), { duration: 5000 });

        setFormData({ fullName: "", email: "", phone: "", projectType: "", message: "" });

      } else {
        // ✅ Error toast
        toast.custom((t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } flex items-start gap-4 bg-white shadow-2xl rounded-xl px-5 py-4 max-w-sm w-full border-l-4 border-red-500`}
          >
            <div className="flex-shrink-0 w-10 h-10 bg-red-50 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <div className="flex-1 pt-0.5">
              <p className="text-sm font-bold text-[#17263a]">Failed to Send</p>
              <p className="text-sm text-gray-500 mt-0.5">
                {data.message || "Something went wrong. Please try again."}
              </p>
            </div>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors mt-0.5"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ), { duration: 5000 });
      }

    } catch (error) {
      console.log(error);
      toast.dismiss(loadingToast);

      // ✅ Network error toast
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } flex items-start gap-4 bg-white shadow-2xl rounded-xl px-5 py-4 max-w-sm w-full border-l-4 border-red-500`}
        >
          <div className="flex-shrink-0 w-10 h-10 bg-red-50 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M12 3a9 9 0 100 18A9 9 0 0012 3z" />
            </svg>
          </div>
          <div className="flex-1 pt-0.5">
            <p className="text-sm font-bold text-[#17263a]">Network Error</p>
            <p className="text-sm text-gray-500 mt-0.5">Check your connection and try again.</p>
          </div>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors mt-0.5"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ), { duration: 5000 });
    }

    setLoading(false);
  };

  return (
    <>
      {/* ✅ Toaster — top-right position */}
      <Toaster
        position="top-right"
        toastOptions={{ duration: 5000 }}
      />

      <section ref={sectionRef} className="w-full">
        {/* Top Content */}
        <div className="text-center mt-20 py-20 px-6">
          <div ref={badgeRef} className="flex justify-center mb-6">
            <span className="border border-gray-400 text-gray-700 text-sm px-4 py-1 rounded-full flex items-center gap-2">
              <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
              Contact Me
            </span>
          </div>

          <h1 ref={headingRef} className="text-4xl md:text-6xl font-semibold text-gray-800 leading-tight max-w-5xl mx-auto">
            Crafting Digital Experiences That Inspire &amp; Perform
          </h1>

          <p ref={subtextRef} className="text-gray-500 mt-6 max-w-5xl mx-auto text-base md:text-lg">
            I build scalable, user-friendly web applications that turn ideas into impactful digital products.
          </p>
        </div>

        {/* Contact Section */}
        <div className="w-full bg-[#17263a]">
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

              {/* Left Side */}
              <div ref={contactLeftRef} className="text-white">
                <div className="mb-6">
                  <span className="inline-block bg-white text-[#f97316] text-sm font-medium px-4 py-2 rounded-full">
                    Contact Details
                  </span>
                </div>
                <h2 className="text-4xl md:text-6xl font-semibold leading-tight">
                  Let&apos;s Work Together
                </h2>
                <p className="text-gray-300 mt-6 max-w-xl text-base md:text-lg leading-relaxed">
                  Whether you have a question, need more details about our services, or want to discuss
                  a potential collaboration, we&apos;re here to help.
                </p>

                <div ref={contactDetailsRef} className="mt-12 space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-white/20 pt-8">
                    <div>
                      <h3 className="text-2xl font-medium text-gray-300 mb-3">Message Us</h3>
                      <p className="text-white font-semibold break-all">rishabhtekam8@gmail.com</p>
                    </div>
                    <div>
                      <h3 className="text-2xl font-medium text-gray-300 mb-3">Call Us</h3>
                      <p className="text-white font-semibold">9111017074</p>
                    </div>
                  </div>

                  <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row md:items-start gap-37">
                    <h3 className="text-2xl font-medium text-gray-300 min-w-[160px]">Location</h3>
                    <p className="text-white font-semibold max-w-md">Indore</p>
                  </div>

                  <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <h3 className="text-2xl font-medium text-gray-300 min-w-[160px]">Business Hours</h3>
                    <div className="text-white font-semibold space-y-2">
                      <p>Monday - Friday, 8:00 AM - 6:00 PM</p>
                      <p>Saturday: 9:00 AM - 2:00 PM</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side Form */}
              <div ref={formRef} className="bg-[#f5f5f5] p-6 md:p-8 lg:p-10 shadow-lg">
                <h2 ref={formTitleRef} className="text-3xl md:text-4xl font-semibold text-center text-[#17263a] mb-10">
                  Send Us Message!
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div ref={(el) => { formFieldsRef.current[0] = el; }}>
                    <label className="block text-sm font-semibold text-[#17263a] mb-2">Full Name*</label>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Your name"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full border border-gray-300 px-4 py-3 bg-transparent outline-none focus:border-[#f97316]"
                    />
                  </div>

                  <div ref={(el) => { formFieldsRef.current[1] = el; }}>
                    <label className="block text-sm font-semibold text-[#17263a] mb-2">Email Address*</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Your email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full border border-gray-300 px-4 py-3 bg-transparent outline-none focus:border-[#f97316]"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div ref={(el) => { formFieldsRef.current[2] = el; }}>
                      <label className="block text-sm font-semibold text-[#17263a] mb-2">Phone Number*</label>
                      <input
                        type="text"
                        name="phone"
                        placeholder="Your phone number"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full border border-gray-300 px-4 py-3 bg-transparent outline-none focus:border-[#f97316]"
                      />
                    </div>

                    <div ref={(el) => { formFieldsRef.current[3] = el; }}>
                      <label className="block text-sm font-semibold text-[#17263a] mb-2">Project Type*</label>
                      <select
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        className="w-full border border-gray-300 px-4 py-3 bg-transparent outline-none focus:border-[#f97316]"
                        required
                      >
                        <option value="">Select project type</option>
                        <option value="Web Design">Web Design</option>
                        <option value="Web Development">Web Development</option>
                        <option value="UI/UX Design">UI/UX Design</option>
                        <option value="E-commerce">E-commerce</option>
                      </select>
                    </div>
                  </div>

                  <div ref={(el) => { formFieldsRef.current[4] = el; }}>
                    <label className="block text-sm font-semibold text-[#17263a] mb-2">Message*</label>
                    <textarea
                      name="message"
                      rows={6}
                      placeholder="Tell us about your project..."
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full border border-gray-300 px-4 py-3 bg-transparent outline-none resize-none focus:border-[#f97316]"
                    ></textarea>
                  </div>

                  <button
                    ref={submitBtnRef}
                    type="submit"
                    disabled={loading}
                    className="bg-[#ff5a2f] hover:bg-[#e44d24] disabled:opacity-70 text-white font-semibold px-8 py-4 inline-flex items-center gap-3 transition-colors duration-300"
                  >
                    {loading ? "Sending..." : "Send Message"}
                    <span className="text-xl inline-block">→</span>
                  </button>
                </form>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactHeroSection;