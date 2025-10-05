'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './sidebar.module.css';
import { useCurrentCompany } from '@/app/dashboard/hooks';
import { useUserRole } from '@/app/dashboard/companies/[id]/hooks';
import { usePathname } from 'next/navigation';
import { FaPaperPlane, FaSignOutAlt } from 'react-icons/fa';
import Image from 'next/image';
import classNames from 'classnames';
import { iconMap } from '../icons';
import { createPortal } from 'react-dom';

const Sidebar: React.FC<any> = () => {
    const { company } = useCurrentCompany();
    const { userRole } = useUserRole();
    console.log('crb_userRole', userRole);
    const pathname = usePathname();
    const [isProductsOpen, setIsProductsOpen] = useState(false);

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    if (!mounted) {
      return null;
    }

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
    
    const item = (permission: any) => { 
      const IconComponent = iconMap[permission.icon];
      return ( <li className={classNames(styles.item, isActive(permission.url) ? styles.current : '')} key={permission.sectionId}>
        {IconComponent && <div className={styles.icon}><IconComponent /></div>}
          <Link
            href={permission.url}
          >
            
            {permission.title}
          </Link>
        </li>)
    }
  
    return createPortal (
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
              <div className={styles.icon}><FaSignOutAlt /></div>
              Разлогване
            </Link>
          </li>
        </ul>
      </nav>,
      document.body
  );
};

export default Sidebar;