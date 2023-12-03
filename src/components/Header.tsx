// src/components/Header.tsx
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Header.module.css';

const menuItems = [
  { label: 'About', path: '/about' },
  //{ label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
  { label: 'Donate', path: '/donate', isButton: true },
];
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className={`${styles.header} opacity-90 p-4 fixed w-full z-10 shadow-lg`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-3xl font-bold">
          <Link href="/" passHref className="flex items-center bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-300 cursor-pointer">
            <Image src="/logo.svg" width={100} height={100} alt="PrayCalc logo" />
          </Link>
        </div>
        <button className="text-white block md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
        <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:flex`}>
          <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-8">  
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link href={item.path} className={`text-white font-bold transition-colors duration-300 hover:text-gray-300 ${item.isButton ? 'bg-green-500 py-2 px-4 rounded hover:bg-green-400' : ''}`}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
