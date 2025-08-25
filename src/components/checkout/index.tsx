import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../cart/CartContext';
import { useUser } from '../hooks';
import { Styles } from './styles';
import Header from '../header';
import Footer from '../Footer';
import { createDevicesMutate, createOrderMutate } from './hooks';

const CheckoutPage: React.FC = () => {
  const { cart, clearCart } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName:  '',
    middleName: '',
    lastName: '',
    country: '',
    city: '',
    email: '',
    address: '',
    phone: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        middleName: user.middleName || '',
        lastName: user.lastName || '',
        country: user.country || '',
        city: user.city || '',
        email: user.email || '',
        address: user.address || '',
        phone: user.phone || ''
      });
    }
  }, [user]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!cart.items.length) {
      setError('Вашата количка е празна. Моля, добавете продукти преди да направите поръчка.');
      return;
    }

    setIsLoading(true);
    try {
      await createDevicesMutate(cart.items);
      await createOrderMutate(formData, cart.items);
      clearCart();
      navigate('/order-confirmation');
    } catch (error) {
      console.error('Error during checkout:', error);
      setError('Възникна грешка при обработката на поръчката. Моля, опитайте отново.');
    } finally {
      setIsLoading(false);
    }
  }, [cart.items, formData, createDevicesMutate, createOrderMutate, clearCart, navigate]);

  return (
    <>
      <Header/>
      <Styles.PageContainer>
        <Styles.ContentContainer>
          <Styles.Title>Завършване на поръчката</Styles.Title>
          {error && <Styles.ErrorMessage>{error}</Styles.ErrorMessage>}
          <Styles.Form onSubmit={handleSubmit}>
            <Styles.OrderSummary>
              <h3>Резюме на поръчката</h3>
              {cart.items.map((item, index) => (
                <Styles.OrderItem key={index}>
                  <Styles.ProductImage src={'images/' + item.image} alt={item.name} />
                  <Styles.ProductInfo>
                    <Styles.ProductName>{item.name}</Styles.ProductName>
                    <Styles.ProductDetails>
                      {item.quantity} x {item.price}лв.
                    </Styles.ProductDetails>
                  </Styles.ProductInfo>
                </Styles.OrderItem>
              ))}
              <Styles.OrderTotal>
                <strong>Общо:</strong> {cart.total.toFixed(2)}лв.
              </Styles.OrderTotal>
            </Styles.OrderSummary>
            <Styles.SubmitButton type="submit" disabled={isLoading}>
              {isLoading ? 'Обработка...' : 'Направи поръчка'}
            </Styles.SubmitButton>
          </Styles.Form>
        </Styles.ContentContainer>
      </Styles.PageContainer>
      <Footer/>
    </>
  );
};

export default CheckoutPage;