import styled from "styled-components";
import { Link } from "react-router-dom";

export const Styles = {
 CartPopupContainer: styled.div`
   position: absolute;
   top: 40px;
   right: -164px;
   background-color: white;
   border-radius: 12px;
   padding: 15px;
   width: 300px;
   box-shadow: 0 4px 15px rgba(110, 142, 251, 0.1);
   z-index: 1000;

   &:before {
     content: '';
     position: absolute;
     top: -8px;
     right: 165px;
     width: 16px;
     height: 16px;
     background-color: white;
     transform: rotate(45deg);
     box-shadow: -2px -2px 5px rgba(110, 142, 251, 0.05);
   }

   @media (max-width: 768px) {
    position: fixed;
    top: 72px;
    left: 0;
    right: 0;
    width: 80%;
    margin: 0 auto;
    max-height: 80vh;
    overflow-y: auto;
    padding: 20px;
    background: rgba(255, 255, 255, 0.98);
    border: 2px solid rgba(110, 142, 251, 0.3);
    border-radius: 12px;
    box-shadow: 
      0 4px 20px rgba(167, 119, 227, 0.15),
      0 0 0 1px rgba(110, 142, 251, 0.1);
    backdrop-filter: blur(8px);
    
    &:before {
      display: none;
    }
  }
 `,

 EmptyCart: styled.div`
   text-align: center;
   padding: 20px 0;
   color: #4a5568;

   @media (max-width: 768px) {
     padding: 30px 0;
     font-size: 1.1rem;
   }
 `,

 LinkButton: styled(Link)`
   display: inline-block;
   padding: 10px 20px;
   background: linear-gradient(135deg, #6e8efb, #a777e3);
   color: white;
   text-decoration: none;
   border-radius: 8px;
   margin-top: 10px;
   transition: opacity 0.3s ease;

   &:hover {
     opacity: 0.9;
   }

   @media (max-width: 768px) {
     display: block;
     text-align: center;
     padding: 15px 20px;
     margin: 20px 0;
     max-width: 250px;
     margin: 0 auto;
     font-size: 1.1rem;
   }
 `,

 CartItem: styled.div`
   display: flex;
   align-items: center;
   margin-bottom: 15px;
   border-bottom: 1px solid rgba(110, 142, 251, 0.1);
   padding-bottom: 15px;

   @media (max-width: 768px) {
     padding: 15px 0;
     margin-bottom: 0;
   }
 `,

 ProductImage: styled.img`
   width: 50px;
   height: 50px;
   object-fit: cover;
   margin-right: 15px;
   border-radius: 8px;

   @media (max-width: 768px) {
     width: 60px;
     height: 60px;
   }
 `,

 ProductInfo: styled.div`
   flex-grow: 1;
 `,

 ProductName: styled.div`
   font-weight: 500;
   color: #4a5568;

   @media (max-width: 768px) {
     font-size: 1.1rem;
     margin-bottom: 4px;
   }
 `,

 ProductQuantity: styled.div`
   font-size: 0.9em;
   color: #718096;
   margin-top: 4px;

   @media (max-width: 768px) {
     font-size: 1rem;
   }
 `,

 ProductPrice: styled.div`
   font-weight: 600;
   background: linear-gradient(135deg, #6e8efb, #a777e3);
   -webkit-background-clip: text;
   -webkit-text-fill-color: transparent;

   @media (max-width: 768px) {
     font-size: 1.1rem;
   }
 `,

 RemoveButton: styled.button`
   background: none;
   border: none;
   color: #a777e3;
   font-size: 1.2em;
   cursor: pointer;
   transition: opacity 0.3s ease;
   padding: 5px;

   &:hover {
     opacity: 0.7;
   }

   @media (max-width: 768px) {
     padding: 10px;
     font-size: 1.4em;
   }
 `,

 CartTotal: styled.div`
   font-weight: 600;
   text-align: right;
   margin-top: 15px;
   margin-bottom: 20px;
   color: #4a5568;
   font-size: 1.1em;

   @media (max-width: 768px) {
     font-size: 1.2rem;
     margin: 20px 0;
     padding: 15px 0;
     border-top: 1px solid rgba(110, 142, 251, 0.1);
   }
 `,

 CheckoutButton: styled(Link)`
   display: block;
   width: 100%;
   padding: 12px 0;
   background: linear-gradient(135deg, #6e8efb, #a777e3);
   color: white;
   text-align: center;
   text-decoration: none;
   border-radius: 8px;
   font-weight: 500;
   transition: opacity 0.3s ease;

   &:hover {
     opacity: 0.9;
   }

   @media (max-width: 768px) {
     padding: 16px 0;
     font-size: 1.1rem;
     border-radius: 12px;
     position: sticky;
     bottom: 0;
     margin-top: 20px;
   }
 `,
};