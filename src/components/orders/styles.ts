import { styled } from "styled-components";

export const Styles = {
  PageContainer: styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 20px;

    @media (max-width: 768px) {
      padding: 20px 10px;
    }
  `,

  ContentContainer: styled.div`
    background: white;
    border-radius: 12px;
    padding: 30px;
    box-shadow: 0 4px 15px rgba(110, 142, 251, 0.1);
    
    @media (max-width: 768px) {
      padding: 20px 15px;
      border-radius: 8px;
    }
  `,

  Title: styled.h1`
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 30px;
    background: linear-gradient(135deg, #6e8efb, #a777e3);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    
    @media (max-width: 768px) {
      font-size: 1.8rem;
      margin-bottom: 20px;
    }
  `,

  OrderCard: styled.div`
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(110, 142, 251, 0.08);
    margin-bottom: 20px;
    padding: 25px;
    border: 1px solid rgba(110, 142, 251, 0.1);
    
    @media (max-width: 768px) {
      padding: 15px;
      margin-bottom: 15px;
      border-radius: 8px;
    }
  `,

  OrderHeader: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    
    @media (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
    }
  `,

  OrderNumber: styled.h3`
    color: #4a5568;
    margin: 0;
    font-size: 1.2rem;
    
    @media (max-width: 768px) {
      font-size: 1.1rem;
    }
  `,

  StatusContainer: styled.div<{ color: string }>`
    display: flex;
    align-items: center;
    color: ${props => props.color};
    font-weight: 500;
    gap: 8px;
    padding: 6px 12px;
    background: ${props => `${props.color}10`};
    border-radius: 20px;

    svg {
      font-size: 1.1em;
    }
    
    @media (max-width: 768px) {
      font-size: 0.9rem;
    }
  `,

  OrderDetails: styled.div`
    border-top: 1px solid rgba(110, 142, 251, 0.1);
    padding-top: 15px;
  `,

  OrderInfo: styled.p`
    margin-bottom: 15px;
    line-height: 1.6;
    color: #4a5568;
    
    strong {
      color: #2d3748;
      margin-right: 5px;
    }
    
    @media (max-width: 768px) {
      font-size: 0.95rem;
    }
  `,

  ProductList: styled.ul`
    list-style-type: none;
    padding: 0;
  `,

  OrderTotal: styled.div`
    font-weight: 600;
    text-align: right;
    margin-top: 15px;
    padding-top: 10px;
    border-top: 1px solid rgba(110, 142, 251, 0.1);
    background: linear-gradient(135deg, #6e8efb, #a777e3);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    
    @media (max-width: 768px) {
      font-size: 0.95rem;
    }
  `,

  ProductItem: styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    padding: 8px;
    background: rgba(110, 142, 251, 0.02);
    border-radius: 8px;
  `,

  ProductImage: styled.img`
    width: 50px;
    height: 50px;
    object-fit: cover;
    margin-right: 10px;
    border-radius: 8px;
  `,

  ProductInfo: styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
  `,

  ProductName: styled.span`
    font-weight: 500;
    color: #2d3748;
    
    @media (max-width: 768px) {
      font-size: 0.95rem;
    }
  `,

  ProductDetails: styled.span`
    font-size: 0.9em;
    color: #718096;
    
    @media (max-width: 768px) {
      font-size: 0.85rem;
    }
  `,
};