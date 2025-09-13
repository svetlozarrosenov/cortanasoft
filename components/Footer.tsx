import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-gray-900 text-lg">
          &copy; {new Date().getFullYear()} CortanaSoft ERP. Всички права запазени.
        </p>
        <div className="flex gap-5">
          <Link href="/privacy" className="text-[#0092b5] hover:underline text-lg">
            Политика за поверителност
          </Link>
          <Link href="/terms" className="text-[#0092b5] hover:underline text-lg">
            Условия за ползване
          </Link>
          <Link href="/contacts" className="text-[#0092b5] hover:underline text-lg">
            Контакти
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;