'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import styles from './sidebar.module.css';
import { useCurrentCompany } from '@/app/dashboard/hooks';
import { useUserRole } from '@/app/dashboard/companies/[id]/hooks';
import { usePathname } from 'next/navigation';
import { Home, LogOut, Package } from 'lucide-react';
import { FaPaperPlane } from 'react-icons/fa';
import Image from 'next/image';

const Sidebar: React.FC<any> = () => {
    const { company } = useCurrentCompany();
    const { userRole } = useUserRole();
  
    const pathname = usePathname();
    const [isProductsOpen, setIsProductsOpen] = useState(false);
  
    const toggleProductsMenu = () => {
      setIsProductsOpen((prev) => !prev);
    };
  
    const isActive = (href: string) => {
      return pathname === href
    }

    const itemWithSubItems = (permission: any) => (<li key={permission.sectionId}>
      <div className={styles.icon}><FaPaperPlane /></div>
      
      <button
        onClick={toggleProductsMenu}
        className={`w-full flex items-center justify-between px-4 py-2 text-base rounded transition-colors duration-300 ${
          isActive(permission.url) ? 'bg-cyan-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-gray-100'
        }`}
      >
        <div className="flex items-center gap-2">
          
          {permission.title}
        </div>
        <svg
          className={`w-4 h-4 transform transition-transform duration-300 ${isProductsOpen ? 'rotate-90' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>
      <ul className={`${isProductsOpen ? 'block' : 'hidden'}`}>
      {permission.children.map((childPermission: any) => {
         return (<li key={childPermission.sectionId}>
         <Link
           href={childPermission?.url || ''}
         >
           {childPermission.title}
         </Link>
       </li>)
      })}
      </ul>
    </li>)
    
    const item = (permission: any) => ( <li className={styles.item} key={permission.sectionId}>
      <div className={styles.icon}><FaPaperPlane /></div>
      <Link
        href={permission.url}
      >
        
        {permission.title}
      </Link>
    </li>)
  
  return (
      <nav  className={styles.sidebar}>
        <div className={styles.logo}>
            <Link href="/">
              <Image
                  src="/CortanaSoftLogoWhite.svg"
                  alt="CortanaSoft Logo"
                  width={282}
                  height={100}
                  className={styles.featureImage}
                />
            </Link>
          </div>
        <ul className={styles.items}>
          {userRole?.permissions?.map((permission: any) => {
           return permission?.children?.length && permission ? itemWithSubItems(permission) : item(permission);
          })}
          <li className={styles.item}>
            <Link
              href="/logout"
            >
              <LogOut className="w-5 h-5" />
              Разлогване
            </Link>
          </li>
        </ul>
      </nav>
  );
};

export default Sidebar;