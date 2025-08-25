import { Link } from "react-router-dom"
import { styled } from "styled-components"

export const Styles = {
  PageContainer: styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 40px 20px;
  `,

  ContentContainer: styled.div`
    background-color: white;
    border-radius: 8px;
    padding: 40px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  `,

  Title: styled.h1`
    color: #003366;
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 30px;
  `,
  ConfirmationIcon: styled.div`
  text-align: center;
  margin-bottom: 20px;
`,

Message: styled.p`
  font-size: 1.1em;
  line-height: 1.6;
  margin-bottom: 20px;
  text-align: center;
`,

InfoBox: styled.div`
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 20px;
  margin-top: 30px;
  margin-bottom: 30px;
`,

InfoTitle: styled.h3`
  color: #003366;
  margin-bottom: 15px;
`,

InfoList: styled.ul`
  padding-left: 20px;
  
  li {
    margin-bottom: 10px;
  }
`,

ButtonContainer: styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
`,

Button: styled(Link)`
  background-color: #0066cc;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #004c99;
  }
`,
}