// Styles.ts
import { styled } from "styled-components";

export const Styles = {
 PageContainer: styled.div`
   max-width: 800px;
   margin: 0 auto;
   padding: 40px 20px;

   @media (max-width: 768px) {
     padding: 20px 10px;
   }
 `,

 ContentContainer: styled.div`
   background-color: white;
   padding: 40px;
   border-radius: 12px;
   box-shadow: 0 4px 15px rgba(110, 142, 251, 0.1);

   @media (max-width: 768px) {
     padding: 20px 15px;
     border-radius: 8px;
   }
 `,

 Title: styled.h1`
   background: linear-gradient(135deg, #6e8efb, #a777e3);
   -webkit-background-clip: text;
   -webkit-text-fill-color: transparent;
   font-size: 2rem;
   margin-bottom: 30px;
   font-weight: 600;
   text-align: center;

   @media (max-width: 768px) {
     font-size: 1.5rem;
     margin-bottom: 20px;
   }
 `,

 Form: styled.form`
   display: flex;
   flex-direction: column;
   gap: 20px;

   @media (max-width: 768px) {
     gap: 15px;
   }
 `,

 Input: styled.input`
   padding: 12px;
   border: 2px solid rgba(110, 142, 251, 0.2);
   border-radius: 8px;
   font-size: 1rem;
   transition: border-color 0.3s ease;

   &:focus {
     outline: none;
     border-color: #6e8efb;
   }

   @media (max-width: 768px) {
     padding: 10px;
     font-size: 0.95rem;
   }
 `,

 TextArea: styled.textarea`
   padding: 12px;
   border: 2px solid rgba(110, 142, 251, 0.2);
   border-radius: 8px;
   min-height: 120px;
   font-size: 1rem;
   transition: border-color 0.3s ease;

   &:focus {
     outline: none;
     border-color: #6e8efb;
   }

   @media (max-width: 768px) {
     padding: 10px;
     font-size: 0.95rem;
     min-height: 100px;
   }
 `,

 OrderSummary: styled.div`
   margin-top: 30px;
   border-top: 2px solid rgba(110, 142, 251, 0.1);
   padding-top: 30px;

   h3 {
     margin-bottom: 20px;
     color: #2d3748;
     font-size: 1.2rem;
   }

   @media (max-width: 768px) {
     margin-top: 20px;
     padding-top: 20px;

     h3 {
       font-size: 1.1rem;
       margin-bottom: 15px;
     }
   }
 `,

 OrderTotal: styled.div`
   font-size: 1.3rem;
   font-weight: 600;
   margin-top: 20px;
   text-align: right;
   background: linear-gradient(135deg, #6e8efb, #a777e3);
   -webkit-background-clip: text;
   -webkit-text-fill-color: transparent;

   @media (max-width: 768px) {
     font-size: 1.1rem;
     margin-top: 15px;
   }
 `,

 SubmitButton: styled.button`
   background: linear-gradient(135deg, #6e8efb, #a777e3);
   color: white;
   padding: 12px 24px;
   border: none;
   border-radius: 8px;
   cursor: pointer;
   font-size: 1.1rem;
   font-weight: 500;
   transition: opacity 0.3s ease;
   width: 100%;
   margin-top: 10px;

   &:hover {
     opacity: 0.9;
   }

   &:disabled {
     opacity: 0.7;
     cursor: not-allowed;
   }

   @media (max-width: 768px) {
     padding: 14px 20px;
     font-size: 1rem;
   }
 `,

 CheckboxContainer: styled.div`
   display: flex;
   align-items: center;
   margin-bottom: 15px;
   gap: 10px;

   @media (max-width: 768px) {
     margin-bottom: 10px;
   }
 `,

 Checkbox: styled.input`
   width: 18px;
   height: 18px;
   border: 2px solid rgba(110, 142, 251, 0.2);
   border-radius: 4px;
   cursor: pointer;

   &:checked {
     accent-color: #6e8efb;
   }
 `,

 Label: styled.label`
   font-size: 1rem;
   color: #4a5568;

   @media (max-width: 768px) {
     font-size: 0.95rem;
   }
 `,

 ErrorMessage: styled.div`
   color: #ef4444;
   background-color: rgba(239, 68, 68, 0.1);
   border: 1px solid rgba(239, 68, 68, 0.2);
   border-radius: 8px;
   padding: 12px;
   margin-bottom: 20px;
   text-align: center;
   font-size: 0.95rem;

   @media (max-width: 768px) {
     padding: 10px;
     margin-bottom: 15px;
     font-size: 0.9rem;
   }
 `,

 OrderItem: styled.div`
   display: flex;
   align-items: center;
   margin-bottom: 15px;
   padding-bottom: 15px;
   border-bottom: 1px solid rgba(110, 142, 251, 0.1);

   @media (max-width: 768px) {
     margin-bottom: 12px;
     padding-bottom: 12px;
   }
 `,

 ProductImage: styled.img`
   width: 60px;
   height: 60px;
   object-fit: cover;
   margin-right: 15px;
   border-radius: 8px;

   @media (max-width: 768px) {
     width: 50px;
     height: 50px;
     margin-right: 12px;
   }
 `,

 ProductInfo: styled.div`
   display: flex;
   flex-direction: column;
   gap: 5px;
   flex: 1;
 `,

 ProductName: styled.span`
   font-weight: 500;
   color: #4a5568;

   @media (max-width: 768px) {
     font-size: 0.95rem;
   }
 `,

 ProductDetails: styled.span`
   font-size: 0.9rem;
   color: #718096;

   @media (max-width: 768px) {
     font-size: 0.85rem;
   }
 `,
};