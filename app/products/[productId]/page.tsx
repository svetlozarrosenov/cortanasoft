import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from './product.module.css';
import { getAllProducts, getProductById } from '@/lib/api';
import AddToCartButton from './AddToCartButton';

export const dynamic = 'force-static';
export const revalidate = false;

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p: any) => ({
    id: p._id.toString(),
  }));
}

export default async function ProductDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }>
}) {
  const { id } = await params;

  console.log('Продукт ID:', id);

  const product = await getProductById(id);

  if (!product) {
    return (
      <div className={styles.container}>
        <h1>Продуктът не е намерен</h1>
        <p>ID: {id}</p>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}><span>{product.name}</span></h1>

      <Image
        src={`/images/${product.image}`}
        alt={product.name}
        width={800}
        height={800}
        className={styles.image}
        priority
      />

      <div className={styles.description}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {product.description}
        </ReactMarkdown>
      </div>

      <div className={styles.price}>{product.price.toFixed(2)} лв.</div>

      <AddToCartButton product={product} />
    </div>
  );
}