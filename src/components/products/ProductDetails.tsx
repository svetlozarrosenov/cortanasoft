import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../header';
import Footer from '../Footer';
import { useUser } from '../hooks';
import { useProduct } from './hooks';
import { useCart } from '../cart/CartContext';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const PageContainer = styled.div`
 max-width: 1000px;
 margin: 0 auto;
 padding: 40px 20px;

 @media (max-width: 768px) {
   padding: 20px 15px;
 }
`;

const ProductTitle = styled.h1`
 font-size: 2.5rem;
 margin-bottom: 20px;
 color: #2d3748;
 
 span {
   background: linear-gradient(135deg, #6e8efb, #a777e3);
   -webkit-background-clip: text;
   -webkit-text-fill-color: transparent;
 }

 @media (max-width: 768px) {
   font-size: 1.8rem;
   margin-bottom: 15px;
   text-align: center;
 }
`;

const ProductImage = styled.img`
 width: 100%;
 max-width: 250px;
 height: auto;
 border-radius: 16px;
 margin-bottom: 30px;
 box-shadow: 0 20px 40px rgba(110, 142, 251, 0.1);
 display: block;

 @media (max-width: 768px) {
   max-width: 100%;
   border-radius: 12px;
   margin: 0 auto 20px;
   box-shadow: 0 10px 20px rgba(110, 142, 251, 0.1);
 }
`;

const ProductDescription = styled.div`
 color: #4a5568;
 font-size: 1.1rem;
 line-height: 1.6;
 margin-bottom: 30px;

 h1, h2, h3 {
   color: #2d3748;
   margin: 1.2em 0 0.5em;
 }

 ul {
   list-style-type: disc;
   padding-left: 20px;
   margin: 1em 0;
 }

 strong {
   font-weight: 600;
 }

 a {
   color: #6e8efb;
   text-decoration: underline;
   &:hover {
     color: #a777e3;
   }
 }

 @media (max-width: 768px) {
   font-size: 1rem;
   line-height: 1.5;
   margin-bottom: 20px;

   h1, h2, h3 {
     text-align: center;
   }

   ul {
     padding-left: 15px;
   }
 }
`;

const OrderButton = styled.button`
 background: linear-gradient(135deg, #6e8efb, #a777e3);
 color: white;
 border: none;
 padding: 16px 32px;
 font-size: 1.1rem;
 border-radius: 8px;
 cursor: pointer;
 transition: all 0.3s ease;
 font-weight: 500;
 
 @media (min-width: 769px) {
   &:hover {
     transform: translateY(-2px);
     box-shadow: 0 8px 16px rgba(110, 142, 251, 0.2);
   }
 }

 @media (max-width: 768px) {
   width: 100%;
   padding: 14px 20px;
   font-size: 1rem;
   border-radius: 8px;
   
   &:active {
     transform: scale(0.98);
   }
 }
`;

const Notification = styled.div`
 background: linear-gradient(135deg, #6e8efb08, #a777e308);
 border: 1px solid rgba(110, 142, 251, 0.2);
 color: #2d3748;
 padding: 16px;
 border-radius: 8px;
 margin-top: 20px;

 @media (max-width: 768px) {
   padding: 12px;
   font-size: 0.95rem;
   text-align: center;
 }
`;

const Price = styled.div`
 font-size: 1.5rem;
 font-weight: 600;
 margin: 24px 0;
 background: linear-gradient(135deg, #6e8efb, #a777e3);
 -webkit-background-clip: text;
 -webkit-text-fill-color: transparent;

 @media (max-width: 768px) {
   font-size: 1.3rem;
   margin: 16px 0;
   text-align: center;
 }
`;

const ProductDetail: React.FC = () => {
 const { productId } = useParams<{ productId: string }>();
 const { product } = useProduct(productId);
 const navigate = useNavigate();
 const { user } = useUser();
 const [notification, setNotification] = useState<string | null>(null);
 const { cart, addToCart } = useCart();

 if (!product) {
   return <div>Продуктът не е намерен.</div>;
 }

 const handleOrder = () => {
   if (!user) {
     navigate('/login');
     return;
   }

   if (product.type === 'sensor' && !cart.items) {
     const hasReceiver = user.orders?.some((order: any) => order.type === 'receiver');
     if (!hasReceiver) {
       setNotification('Трябва да поръчате и приемник, за да използвате този сензор.');
       return;
     }
   }

   addToCart({
     id: product._id,
     name: product.name,
     quantity: 1,
     price: product.price,
     image: product.image,
     type: product.type,
   });

   setNotification('Продуктът е добавен в кошницата!');
 };

 return (
   <>
     <Header />
     <PageContainer>
       <ProductTitle><span>{product.name}</span></ProductTitle>
       <ProductImage src={`/images/${product.image}`} alt={product.name} />
       <ProductDescription>
         <ReactMarkdown remarkPlugins={[remarkGfm]}>{product.description}</ReactMarkdown>
       </ProductDescription>
       <Price>{product.price.toFixed(2)} лв.</Price>
       <OrderButton onClick={handleOrder}>Добави в кошницата</OrderButton>
       {notification && <Notification>{notification}</Notification>}
     </PageContainer>
     <Footer />
   </>
 );
};

export default ProductDetail;