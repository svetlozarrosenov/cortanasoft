// Products.tsx
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Header from '../header';
import Footer from '../Footer';
import { useProducts } from './hooks';

const PageContainer = styled.div`
 max-width: 1200px;
 margin: 0 auto;
 padding: 40px 20px;
 
 @media (max-width: 768px) {
   padding: 20px 10px;
 }
`;

const Title = styled.h1`
 font-size: 2.5rem;
 text-align: center;
 margin-bottom: 40px;
 color: #2d3748;
 
 span {
   background: linear-gradient(135deg, #6e8efb, #a777e3);
   -webkit-background-clip: text;
   -webkit-text-fill-color: transparent;
 }

 @media (max-width: 768px) {
   font-size: 1.8rem;
   margin-bottom: 24px;
 }
`;

const CategorySection = styled.section`
 margin-bottom: 60px;

 @media (max-width: 768px) {
   margin-bottom: 40px;
 }
`;

const CategoryTitle = styled.h2`
 font-size: 2rem;
 margin-bottom: 30px;
 color: #2d3748;
 
 span {
   background: linear-gradient(135deg, #6e8efb, #a777e3);
   -webkit-background-clip: text;
   -webkit-text-fill-color: transparent;
 }

 @media (max-width: 768px) {
   font-size: 1.5rem;
   margin-bottom: 20px;
 }
`;

const ProductGrid = styled.div`
 display: grid;
 grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
 gap: 30px;

 @media (max-width: 768px) {
   grid-template-columns: 1fr;
   gap: 20px;
 }
`;

const ProductCard = styled.div`
 background: white;
 border-radius: 16px;
 padding: 20px;
 box-shadow: 0 4px 6px rgba(110, 142, 251, 0.1);
 transition: all 0.3s ease;
 border: 1px solid rgba(110, 142, 251, 0.1);

 @media (min-width: 769px) {
   &:hover {
     transform: translateY(-5px);
     box-shadow: 0 20px 40px rgba(110, 142, 251, 0.1);
   }
 }

 @media (max-width: 768px) {
   padding: 15px;
   border-radius: 12px;

   &:active {
     transform: scale(0.98);
     background: rgba(110, 142, 251, 0.02);
   }
 }
`;

const ProductImage = styled.img`
 width: 100%;
 height: auto;
 object-fit: cover;
 border-radius: 12px;
 margin-bottom: 15px;

 @media (max-width: 768px) {
   height: auto;
   border-radius: 8px;
   margin-bottom: 12px;
 }
`;

const ProductName = styled.h3`
 color: #2d3748;
 font-size: 1.2rem;
 margin-bottom: 15px;

 @media (max-width: 768px) {
   font-size: 1.1rem;
   margin-bottom: 12px;
 }
`;

const ProductLink = styled(Link)`
 display: inline-block;
 background: linear-gradient(135deg, #6e8efb, #a777e3);
 color: white;
 padding: 12px 24px;
 border-radius: 8px;
 text-decoration: none;
 transition: all 0.3s ease;
 font-weight: 500;
 text-align: center;
 margin: 0 auto;
 width: 78%;
 
 @media (min-width: 769px) {
   &:hover {
     transform: translateY(-2px);
     box-shadow: 0 8px 16px rgba(110, 142, 251, 0.2);
   }
 }

 @media (max-width: 768px) {
   width: 100%;
   padding: 14px 0;
   font-size: 1rem;
   
   &:active {
     opacity: 0.9;
   }
 }`;

const Divider = styled.hr`
 border: none;
 height: 1px;
 background: linear-gradient(90deg, transparent, rgba(110, 142, 251, 0.2), transparent);
 margin: 40px 0;

 @media (max-width: 768px) {
   margin: 30px 0;
 }
`;

const Description = styled.p`
 color: #4a5568;
 font-size: 1.1rem;
 margin-bottom: 30px;
 line-height: 1.6;

 @media (max-width: 768px) {
   font-size: 1rem;
   margin-bottom: 20px;
   line-height: 1.5;
 }
`;

const ProductsPage: React.FC = () => {
 const {products = []} = useProducts();

 return (
   <>
     <Header />
     <PageContainer>
       <Title>Нашите <span>Продукти</span></Title>
       
       <CategorySection>
         <CategoryTitle><span>Приемници</span></CategoryTitle>
         <Description>
           Приемниците са сърцето на нашата алармена система. Те служат като централен хъб, 
           към който всички сензори докладват, когато засекат нещо. Всяка система се нуждае 
           от поне един приемник, който обработва сигналите от сензорите и активира алармата 
           при нужда. Нашите приемници са оборудвани с най-съвременна технология за надеждна 
           комуникация и бърза реакция.
         </Description>
         <ProductGrid>
           {products
             .filter((product: any) => product.type === 'receiver')
             .map((product: any) => (
               <ProductCard key={product._id}>
                 <ProductImage src={'images/' + product.image} alt={product.name} />
                 <ProductName>{product.name}</ProductName>
                 <ProductLink to={`/products/${product._id}`}>Научете повече</ProductLink>
               </ProductCard>
             ))
           }
         </ProductGrid>
       </CategorySection>

       <Divider />

       <CategorySection>
         <CategoryTitle><span>Сензори</span></CategoryTitle>
         <Description>
           Предлагаме широка гама от сензори, подходящи за различни нужди и среди. 
           Нашите сензори включват инфрачервени детектори за движение, вибрационни сензори 
           за прозорци и врати, лазерни сензори за прецизно наблюдение на определени зони, 
           и много други. Можете да комбинирате различни типове сензори според вашите 
           специфични изисквания за сигурност.
         </Description>
         <ProductGrid>
           {products
             .filter((product: any) => product.type === 'sensor')
             .map((product: any) => (
               <ProductCard key={product._id}>
                 <ProductImage src={'images/' + product.image} alt={product.name} />
                 <ProductName>{product.name}</ProductName>
                 <ProductLink to={`/products/${product._id}`}>Научете повече</ProductLink>
               </ProductCard>
             ))
           }
         </ProductGrid>
       </CategorySection>
     </PageContainer>
     <Footer />
   </>
 );
};

export default ProductsPage;