'use client';
import React from 'react';
import styles from './boxes.module.css';
import { useActiveTasks } from '@/app/dashboard/tasks/hooks';
import { useActiveOrders, useRevenue } from '@/app/dashboard/orders/hooks';
import { useClients } from '@/app/dashboard/clients/hooks';
import Link from 'next/link';
import { FaDollarSign, FaChartLine, FaUsers, FaTasks, FaShoppingCart, FaMoneyCheck } from 'react-icons/fa';
import classNames from 'classnames';
import { useCurrentCompany } from '@/app/dashboard/hooks';

const DashboardBoxes: React.FC = () => {
  const { tasks } = useActiveTasks();
  const { clients } = useClients();
  const { orders } = useActiveOrders();
  const { revenue } =  useRevenue();
  const {company} = useCurrentCompany();

  return (
    <ul className={styles.boxes}>
      <li className={styles.box} >
        <Link className={styles.link} href='/dashboard/orders'></Link>
        
        <FaMoneyCheck className={styles.icon} />
        
        <h4 className={styles.title}>Месечна печалба</h4>
        
        <p className={styles.value}>{revenue?.totalRevenue} {company?.currency}</p>
        
        <p className={styles.content} >Оборот за месеца</p>
      </li>

      <li className={classNames(styles.box, styles.boxOrange)} >
        <Link className={styles.link} href='/dashboard/orders'></Link>
        
        <FaChartLine className={styles.icon} />
        
        <h4 className={styles.title}>Годишна печалба</h4>
        
        <p className={styles.value}>{revenue?.totalRevenue} {company?.currency}</p>
        
        <p className={styles.content} >Печалба от началото на годината.</p>
      </li>

      <li className={classNames(styles.box, styles.boxYellow)} >
        <Link className={styles.link} href='/dashboard/clients'></Link>
        
        <FaUsers className={styles.icon} />
        
        <h4 className={styles.title}>Клиенти</h4>
        
        <p className={styles.value}>{clients?.length}</p>
        
        <p className={styles.content} >Общ брой клиенти</p>
      </li>

      <li className={classNames(styles.box, styles.boxGreen)} >
        <Link className={styles.link} href='/dashboard/tasks'></Link>
        
        <FaTasks className={styles.icon} />
        
        <h4 className={styles.title}>Активни задачи</h4>
        
        <p className={styles.value}>{tasks?.length}</p>
        
        <p className={styles.content} >Всички активни задачи</p>
      </li>

      <li className={classNames(styles.box, styles.boxBlue)} >
        <Link className={styles.link} href='/dashboard/orders'></Link>
        
        <FaShoppingCart className={styles.icon} />
        
        <h4 className={styles.title}>Активни поръчки</h4>
        
        <p className={styles.value}>{orders?.length}</p>
        
        <p className={styles.content} >Брой активни поръчки</p>
      </li>
    </ul>
  );
};

export default DashboardBoxes;