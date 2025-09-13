import React from 'react';
import Navigation from './navigation';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="bg-[#0092b5] text-white py-4 px-4 shadow-md fixed w-full top-0 z-50">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <Link href="/" className="text-2xl md:text-3xl font-bold hover:text-gray-100 transition">
            CortanaSoft ERP
          </Link>
        </div>
        <Navigation />
      </div>
    </header>
  );
};

export default Header;