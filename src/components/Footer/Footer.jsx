import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Instagram, Facebook } from 'lucide-react'; // For social media icons

// Data for footer links - easier to manage
const quickLinks = [
  { href: '/', label: 'Movie Picker' },
  { href: '/genres', label: 'Top Genres' },
  { href: '/actors', label: 'Top Actors' },
];

const legalLinks = [
  { href: '#', label: 'Privacy Policy' },
  { href: '#', label: 'Terms of Service' },
  { href: '#', label: 'Contact Us' },
];

const socialLinks = [
  { href: '#', icon: <Twitter size={20} />, label: 'Twitter' },
  { href: '#', icon: <Instagram size={20} />, label: 'Instagram' },
  { href: '#', icon: <Facebook size={20} />, label: 'Facebook' },
];

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 border-t border-zinc-800">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Column 1: Brand and Mission */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold text-white mb-2">
              M<span className="text-red-600">R</span>
            </h3>
            <p className="text-sm">
              Your personal AI-powered guide to finding the perfect movie for any mood or occasion.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-semibold text-white tracking-wider uppercase mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="hover:text-red-500 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h4 className="font-semibold text-white tracking-wider uppercase mb-4">Legal</h4>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-red-500 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Social Media */}
          <div>
            <h4 className="font-semibold text-white tracking-wider uppercase mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a 
                  key={social.label} 
                  href={social.href} 
                  aria-label={social.label}
                  className="hover:text-red-500 transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar with Copyright */}
        <div className="mt-12 pt-8 border-t border-zinc-800 text-center text-sm">
          <p>
            © {new Date().getFullYear()} Movie Recommendation System. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;