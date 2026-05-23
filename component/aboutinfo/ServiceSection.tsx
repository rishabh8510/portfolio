import Image from "next/image";

export default function ServiceSection() {
  return (
    <section className="w-full bg-[#ead3c8]">
      <div className="grid min-h-105 grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex justify-end items-center">
          <div className="">
            <h2 className="text-[38px] leading-[1.12] tracking-[-0.03em] text-[#1f2f46] sm:text-[46px] lg:text-[58px]">
              Find the Right Service
              <br />
              for Your Digital Needs
            </h2>

            <p className="mt-7 max-w-140 text-[17px] leading-[1.8] text-[#32445a]">
Transforming ideas into robust digital products through clean code, modern technologies, and efficient system design.
            </p>

            <button className="mt-9 inline-flex items-center gap-3 bg-[#22364b] px-7 py-4 text-[15px] font-medium text-white transition hover:bg-[#1b2b3c]">
              View All Projects
              <span className="text-lg">→</span>
            </button>
          </div>
        </div>

        <div className="relative min-h-80">
          <Image
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop"
            alt="Modern orange building exterior"
            fill
            priority
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}