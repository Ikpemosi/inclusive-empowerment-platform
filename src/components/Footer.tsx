
import { Facebook, Twitter, Instagram, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-secondary to-accent text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <img 
              src="/logo.png" 
              alt="IDEA Logo" 
              className="h-16 w-auto"
            />
            <p className="text-white/80">
              Advancing social, economic, and political inclusion through strategic advocacy.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold mb-4 text-xl">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="hover:text-white/80 transition-colors">About Us</a></li>
              <li><a href="/gallery" className="hover:text-white/80 transition-colors">Gallery</a></li>
              <li><a href="/team" className="hover:text-white/80 transition-colors">Our Team</a></li>
              <li><a href="#contact" className="hover:text-white/80 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading font-semibold mb-4 text-xl">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <MapPin size={18} />
                <span>Plot 765, Mustapha Akanbi Crescent, Gwarinpa, Abuja</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} />
                <span>+234-803-332-1826</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} />
                <span>ideafoundationngo@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-heading font-semibold mb-4 text-xl">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white/80 transition-colors">
                <Facebook size={24} />
              </a>
              <a href="#" className="hover:text-white/80 transition-colors">
                <Twitter size={24} />
              </a>
              <a href="#" className="hover:text-white/80 transition-colors">
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/60">
          <p>&copy; {new Date().getFullYear()} IDEA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
