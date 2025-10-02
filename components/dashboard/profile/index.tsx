'use client';
import React from 'react';
import styles from './profile.module.css';
import { useAuth } from '@/app/login/hooks';
import Image from 'next/image';

const Profile: React.FC = () => {
  const {user} = useAuth();
  return (
    <div className={styles.header}>
        <Image src="/images/profile.jpeg"
              alt="CortanaSoft Logo"
              width={282}
              height={100}
              className={styles.image}
          />
      <p className={styles.user}>{user?.firstName} {user?.lastName}</p>
    </div>
  );
};

export default Profile;