'use client';
import React from 'react';
import styles from './boxes.module.css';
import { useActiveTasks } from '@/app/dashboard/tasks/hooks';
import { useActiveOrders, useRevenue } from '@/app/dashboard/orders/hooks';
import { useClients } from '@/app/dashboard/clients/hooks';
import Link from 'next/link';
import { FaCalendarAlt, FaCalendar, FaMinusCircle, FaChartBar, FaCheckCircle, FaUserFriends, FaClipboardList, FaBox, FaDollarSign, FaChartLine, FaUsers, FaTasks, FaShoppingCart, FaMoneyCheck } from 'react-icons/fa';
import classNames from 'classnames';
import { useCurrentCompany } from '@/app/dashboard/hooks';
import { formatPrice } from '@/utils/helpers';

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
        
        <FaCalendarAlt className={styles.icon} />
        
        <h4 className={styles.title}>Месечен оборот</h4>
        
        <p className={styles.value}>{formatPrice(revenue?.totalRevenue, company?.currency)}</p>
        
        <p className={styles.content} >Оборот за месеца</p>
      </li>

      <li className={classNames(styles.box, styles.boxOrange)} >
        <Link className={styles.link} href='/dashboard/orders'></Link>
        
        <FaCalendar className={styles.icon} />
        
        <h4 className={styles.title}>Годишен оборот</h4>
        
        <p className={styles.value}>{formatPrice(revenue?.totalRevenue, company?.currency)}</p>
        
        <p className={styles.content} >Оборот от началото на годината.</p>
      </li>

      <li className={classNames(styles.box, styles.boxOrange1)} >
        <Link className={styles.link} href='/dashboard/supplies'></Link>
        
        <FaMinusCircle className={styles.icon} />
        
        <h4 className={styles.title}>Месечни пазходи</h4>
        
        <p className={styles.value}>{formatPrice(revenue?.expenses?.monthly, company?.currency)}</p>
        
        <p className={styles.content} >Разходи за месеца.</p>
      </li>

      <li className={classNames(styles.box, styles.boxOrange2)} >
        <Link className={styles.link} href='/dashboard/supplies'></Link>
        
        <FaChartBar className={styles.icon} />
        
        <h4 className={styles.title}>Годишни разходи</h4>
        
        <p className={styles.value}>{formatPrice(revenue?.expenses?.yearly, company?.currency)}</p>
        
        <p className={styles.content} >Разходи за цялата година.</p>
      </li>

      {revenue?.totalRevenue - revenue?.expenses?.yearly > 0 && <li className={classNames(styles.box, styles.boxOrange)} >
        <Link className={styles.link} href='/dashboard/supplies'></Link>
        
        <FaCheckCircle className={styles.icon} />
        
        <h4 className={styles.title}>Чиста печалба</h4>
        
        <p className={styles.value}>{formatPrice(revenue?.totalRevenue - revenue?.expenses?.yearly, company?.currency)}</p>
        
        <p className={styles.content} >Чиста печалба за година</p>
      </li>}

      <li className={classNames(styles.box, styles.boxYellow)} >
        <Link className={styles.link} href='/dashboard/clients'></Link>
        
        <FaUserFriends className={styles.icon} />
        
        <h4 className={styles.title}>Клиенти</h4>
        
        <p className={styles.value}>{clients?.length}</p>
        
        <p className={styles.content} >Общ брой клиенти</p>
      </li>

      <li className={classNames(styles.box, styles.boxGreen)} >
        <Link className={styles.link} href='/dashboard/tasks'></Link>
        
        <FaClipboardList className={styles.icon} />
        
        <h4 className={styles.title}>Активни задачи</h4>
        
        <p className={styles.value}>{tasks?.length}</p>
        
        <p className={styles.content} >Всички активни задачи</p>
      </li>

      <li className={classNames(styles.box, styles.boxBlue)} >
        <Link className={styles.link} href='/dashboard/orders'></Link>
        
        <FaBox className={styles.icon} />
        
        <h4 className={styles.title}>Активни поръчки</h4>
        
        <p className={styles.value}>{orders?.length}</p>
        
        <p className={styles.content} >Брой активни поръчки</p>
      </li>
    </ul>
  );
};

export default DashboardBoxes;