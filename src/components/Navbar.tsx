
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { title: "About", href: "#about" },
    { title: "What We Do", href: "#what-we-do" },
    { title: "Team", href: "#team" },
    { title: "Events", href: "#events" },
    { title: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-lg z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <a 
            href="/" 
            className="flex items-center space-x-2 relative z-50"
          >
            <span className="text-2xl font-heading font-bold text-primary">IDEA</span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 relative z-50">
            {menuItems.map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="text-gray-600 hover:text-primary transition-colors duration-200"
              >
                {item.title}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-600 relative z-50"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 animate-fade-in relative z-40 bg-white">
            {menuItems.map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="block py-2 text-gray-600 hover:text-primary transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                {item.title}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
