'use client'; // Опционално, ако useProducts е клиентски; иначе премахни за SSR

import React from 'react';
import styles from './products.module.css'; // Импорт на CSS модула
import Link from 'next/link';
import { useProducts } from '@/app/products/hooks';

const ProductsPage: React.FC = () => {
  const {products = []} = useProducts();
console.log('crb_products', products);
  return (
    <>
      <div className={styles.pageContainer}>
        <h1 className={styles.title}>Нашите <span>Продукти</span></h1>
        
        <section className={styles.categorySection}>
          <h2 className={styles.categoryTitle}><span>Приемници</span></h2>
          <p className={styles.description}>
            Приемниците са сърцето на нашата алармена система. Те служат като централен хъб, 
            към който всички сензори докладват, когато засекат нещо. Всяка система се нуждае 
            от поне един приемник, който обработва сигналите от сензорите и активира алармата 
            при нужда. Нашите приемници са оборудвани с най-съвременна технология за надеждна 
            комуникация и бърза реакция.
          </p>
          <div className={styles.productGrid}>
            {products
              .filter((product: any) => product.type === 'receiver')
              .map((product: any) => (
                <div key={product._id} className={styles.productCard}>
                  <img src={'images/' + product.image} alt={product.name} className={styles.productImage} />
                  <h3 className={styles.productName}>{product.name}</h3>
                  <Link href={`/products/${product._id}`} className={styles.productLink}>Научете повече</Link>
                </div>
              ))
            }
          </div>
        </section>

        <hr className={styles.divider} />

        <section className={styles.categorySection}>
          <h2 className={styles.categoryTitle}><span>Сензори</span></h2>
          <p className={styles.description}>
            Предлагаме широка гама от сензори, подходящи за различни нужди и среди. 
            Нашите сензори включват инфрачервени детектори за движение, вибрационни сензори 
            за прозорци и врати, лазерни сензори за прецизно наблюдение на определени зони, 
            и много други. Можете да комбинирате различни типове сензори според вашите 
            специфични изисквания за сигурност.
          </p>
          <div className={styles.productGrid}>
            {products
              .filter((product: any) => product.type === 'sensor')
              .map((product: any) => (
                <div key={product._id} className={styles.productCard}>
                  <img src={'images/' + product.image} alt={product.name} className={styles.productImage} />
                  <h3 className={styles.productName}>{product.name}</h3>
                  <Link href={`/products/${product._id}`} className={styles.productLink}>Научете повече</Link>
                </div>
              ))
            }
          </div>
        </section>
      </div>
    </>
  );
};

export default ProductsPage;