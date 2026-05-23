import { FaGithub, FaLinkedin, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-16 pb-6">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">

        {/* Logo + About */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-9 w-9 rounded-xl bg-linear-to-br from-[#ff5a2c] to-[#ff3d00] flex items-center justify-center text-white font-bold text-sm">
              RT
            </div>
            <span className="text-xl font-bold">
              Rishabh Tekam<span className="text-[#ff5a2c]"></span>
            </span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            Full-stack developer crafting clean and user-focused web experiences.
            Open to freelance projects and full-time opportunities.
          </p>


        </div>

        {/* Navigation */}
        <div>
          <h3 className="font-semibold mb-4 text-white">Navigation</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href="/" className="hover:text-[#ff5a2c] transition-colors">Home</a></li>
            <li><a href="/about" className="hover:text-[#ff5a2c] transition-colors">About</a></li>
            <li><a href="/project" className="hover:text-[#ff5a2c] transition-colors">Projects</a></li>
            <li><a href="/contact" className="hover:text-[#ff5a2c] transition-colors">Contact</a></li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="font-semibold mb-4 text-white">Socials</h3>
          <div className="flex gap-4">
            <a 
              href="https://github.com/rishabh8510" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#ff5a2c] transition-all hover:scale-110"
              aria-label="GitHub"
            >
              <FaGithub size={22} />
            </a>
            <a 
              href="https://www.linkedin.com/in/rishabh-tekam-b40653260/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#ff5a2c] transition-all hover:scale-110"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={22} />
            </a>
            <a 
              href="https://www.youtube.com/@codewithrishabh_09" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#ff5a2c] transition-all hover:scale-110"
              aria-label="YouTube"
            >
              <FaYoutube size={22} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="max-w-7xl mx-auto px-6 mt-10">
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Rishabh Tekam. All rights reserved.</p>
          <p className="mt-2 md:mt-0">
            Designed & built by{" "}
            <span className="text-[#ff5a2c]">Rishabh</span>
          </p>
        </div>
      </div>
    </footer>
  );
}