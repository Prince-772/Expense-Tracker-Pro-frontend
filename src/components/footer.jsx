import React from 'react';
import Logo from "./logo";
import { Link } from 'react-router-dom';

// Import icons correctly
import InstagramIcon from "../assets/icons/instagram.svg";
import XIcon from "../assets/icons/x.svg";
import LinkedInIcon from "../assets/icons/linkedIn.svg";

const Footer = () => {
  return (
    <footer className='w-full flex flex-col px-5 py-10 md:px-10 md:pt-20 bg-gray-100'>
      
      {/* Top Section */}
      <div className="top flex flex-col gap-10 lg:gap-5 lg:flex-row justify-between">
        
        {/* Left Section */}
        <div className="box-1 w-full text-center lg:text-left">
          <Logo />
          <p className='mt-5 lg:mt-10 text-sm md:text-base text-gray-700'>
            Expense Tracker Pro helps you manage your finances efficiently with powerful tracking tools.
          </p>
          <Link
            to="/signup"
            className="text-base lg:text-lg px-6 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-md mt-5 inline-block font-semibold"
          >
            Sign Up for Free
          </Link>
        </div>

        {/* Links Section */}
        <div className="box-2 w-full flex flex-col md:flex-row justify-between items-center text-base gap-7">
          
          {/* Company Links */}
          <div className="links1 text-center md:text-left">
            <p className='md:text-lg font-bold mb-3'>Company</p>
            <ul className='flex flex-col gap-2'>
              {[
                { label: "About Us", link: "/about" },
                { label: "Contact Us", link: "/contact" },
                { label: "FAQs", link: "/about" },
                { label: "Support", link: "/support" }
              ].map(link => (
                <li className='text-gray-800' key={link.label}>
                  <Link to={link.link}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div className="links2 text-center md:text-left">
            <p className='md:text-lg font-bold mb-3'>Resources</p>
            <ul className='flex flex-col gap-2'>
              {[
                { label: "Features", link: "/features" },
                { label: "Pricing", link: "/pricing" },
                { label: "Terms & Conditions", link: "/termsandconditions" },
                { label: "Privacy Policy", link: "/privacypolicy" }
              ].map(link => (
                <li className='text-gray-800' key={link.label}>
                  <Link to={link.link}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="links3 text-center md:text-left">
            <p className='md:text-lg font-bold mb-3'>Follow Us</p>
            <ul className='flex flex-col gap-3'>
              {[
                { label: "Instagram", link: "https://instagram.com/pk_addon", icon: InstagramIcon },
                { label: "X", link: "https://x.com/Prince_K772", icon: XIcon },
                { label: "LinkedIn", link: "https://www.linkedin.com/in/prince-kushwaha-b2163032b/", icon: LinkedInIcon }
              ].map(social => (
                <a href={social.link} target="_blank" rel="noopener noreferrer" className='flex items-center justify-center md:justify-start gap-2 text-gray-800 font-semibold' key={social.label}>
                  <img src={social.icon} alt={social.label} className='w-6 md:w-7' />
                  {social.label}
                </a>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Section */}
      <hr className='mt-10 md:mt-20 mb-5 border-gray-300' />
      <div className="text-center text-sm md:text-base text-gray-600 pb-5">
        &copy; 2025 Expense Tracker Pro. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
