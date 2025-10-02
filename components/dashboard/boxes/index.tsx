'use client';
import React from 'react';
import styles from './boxes.module.css';
import { useUser } from '@/app/login/hooks';
import { useActiveTasks } from '@/app/dashboard/tasks/hooks';
import { useActiveOrders, useRevenue } from '@/app/dashboard/orders/hooks';
import { useClients } from '@/app/dashboard/clients/hooks';
import Link from 'next/link';
import { FaCogs } from 'react-icons/fa';
import classNames from 'classnames';

const DashboardBoxes: React.FC = () => {
  const { user } = useUser();
  const { tasks } = useActiveTasks();
  const { clients } = useClients();
  const { orders } = useActiveOrders();
  const { revenue } =  useRevenue();

  console.log('crb_orders', orders)
  return (
    <ul className={styles.boxes}>
      <li className={styles.box} >
        <Link className={styles.link} href='/dashboard/orders'></Link>
        
        <FaCogs className={styles.icon} />
        
        <h4 className={styles.title}>Месечна печалба</h4>
        
        <p className={styles.value}>2131$</p>
        
        <p className={styles.content} >Оборот за месеца</p>
      </li>

      <li className={classNames(styles.box, styles.boxOrange)} >
        <Link className={styles.link} href='/orders'></Link>
        
        <FaCogs className={styles.icon} />
        
        <h4 className={styles.title}>Monthly income</h4>
        
        <p className={styles.value}>2131$</p>
        
        <p className={styles.content} >Total revenue for September .</p>
      </li>

      <li className={classNames(styles.box, styles.boxYellow)} >
        <Link className={styles.link} href='/dashboard/clients'></Link>
        
        <FaCogs className={styles.icon} />
        
        <h4 className={styles.title}>Клиенти</h4>
        
        <p className={styles.value}>2131</p>
        
        <p className={styles.content} >Общ брой клиенти</p>
      </li>

      <li className={classNames(styles.box, styles.boxGreen)} >
        <Link className={styles.link} href='/dashboard/tasks'></Link>
        
        <FaCogs className={styles.icon} />
        
        <h4 className={styles.title}>Активни задачи</h4>
        
        <p className={styles.value}>{tasks?.length}</p>
        
        <p className={styles.content} >Всички активни задачи</p>
      </li>

      <li className={classNames(styles.box, styles.boxBlue)} >
        <Link className={styles.link} href='/dashboard/orders'></Link>
        
        <FaCogs className={styles.icon} />
        
        <h4 className={styles.title}>Активни поръчки</h4>
        
        <p className={styles.value}>12</p>
        
        <p className={styles.content} >Брой активни поръчки</p>
      </li>
    </ul>
  );
};

export default DashboardBoxes;