import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full bg-black text-white z-50 h-[78px] lg:h-24 flex items-center justify-center
         transition-colors duration-300 ${isScrolled ? 'bg-transparent  ' : ''} `}
    >
      <div 
        className={`w-[85%] max-w-4xl px-4 flex justify-between items-center transition-all py-3 lg:py-4 rounded-xl bg-black
         duration-  ${isScrolled ? ' border-white border-[2px] lg:max-w-4xl bg-' : '' }`}
      >  

        {/* Logo */}
        <Link to="/" aria-label="Home">
          <h1 className="font-bold text-xl lg:text-2xl">clariso</h1>
        </Link>

        {/* Mobile actions */}
        <div className="lg:hidden flex items-center gap-4">
          <Link
            to="/login"
            className="bg-blue-500 hover:opacity-80 rounded-xl px-5 py-2 font-bold"
          >
            Get Started
          </Link>

          <div onClick={toggleMenu} className="cursor-pointer ">
            {isMenuOpen ? <IoClose className="text-2xl" /> : <RxHamburgerMenu className="text-2xl " />}
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {isMenuOpen && (
          <div className="absolute left-1/2 transform -translate-x-1/2 top-[90px] w-[85%] max-w-4xl bg-gray-900 z-40 py-6 rounded-xl lg:hidden">

            <ul className="flex flex-col items-center gap-y-8">
              <a href="#features" className="text-xl font-medium hover:text-orange-500" onClick={() => setIsMenuOpen(false)}>
                Features
              </a>
              <a href="#faqs" className="text-xl font-medium hover:text-orange-500" onClick={() => setIsMenuOpen(false)}>
                FAQS
              </a>
              {/* <Link to="/pricing" className="text-xl font-medium hover:text-orange-500" onClick={() => setIsMenuOpen(false)}>
                Pricing
              </Link> */}
              {/* <Link className="text-xl font-medium hover:text-orange-500" onClick={() => setIsMenuOpen(false)}>
                Contact
              </Link> */}
            </ul>
          </div>
        )}

        {/* Desktop nav */}
        <nav className="hidden lg:flex gap-x-9 items-center">
          <a href="#features" className="text-lg  font-medium hover:text-orange-500">Features</a>
          <a href="#faqs" className="text-lg font-medium hover:text-orange-500">FAQS</a>

        </nav>

        {/* Desktop Get Started */}
        <nav className="hidden lg:flex items-center">
          <Link
            to="/login"
            className="text-white lg:text-xl font-medium bg-blue-500 px-4 py-2 rounded-xl hover:opacity-90"
          >
            Get Started
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;