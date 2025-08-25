import React from 'react';
import { Styles } from './styles';
import Header from '../header';
import Footer from '../Footer';
import { FaBox, FaCheckCircle, FaTruck, FaTimesCircle } from 'react-icons/fa';
import { useOrders } from './hooks';
import { useUser } from '../hooks';
import { useNavigate } from 'react-router-dom';

interface Order {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  phone: string;
  country: string;
  city: string;
  products: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
    image: string;
  }>;
  totalPrice: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
}

const OrderStatus: React.FC<{ status: Order['status'] }> = ({ status }) => {
  const navigate = useNavigate();
  const statusInfo = {
    pending: { icon: FaBox, color: '#ffa500', text: 'Очаква обработка' },
    processing: { icon: FaBox, color: '#4169e1', text: 'Обработва се' },
    shipped: { icon: FaTruck, color: '#32cd32', text: 'Изпратена' },
    delivered: { icon: FaCheckCircle, color: '#228b22', text: 'Доставена' },
    cancelled: { icon: FaTimesCircle, color: '#dc143c', text: 'Отменена' },
  };
  const {isLoading, user } = useUser();
  if(!isLoading && !user) {
    navigate('/login');
  }
  const StatusIcon = statusInfo[status].icon;

  return (
    <Styles.StatusContainer color={statusInfo[status].color}>
      <StatusIcon />
      <span>{statusInfo[status].text}</span>
    </Styles.StatusContainer>
  );
};

const MyOrders: React.FC = () => {
    const { orders } = useOrders();
    console.log('crb_orders', orders)
    return (
    <>
      <Header />
      <Styles.PageContainer>
        <Styles.ContentContainer>
          <Styles.Title>Моите поръчки</Styles.Title>
          {orders && orders.map((order: Order) => (
            <Styles.OrderCard key={order._id}>
              <Styles.OrderHeader>
                <Styles.OrderNumber>Поръчка #{order._id.slice(-6)}</Styles.OrderNumber>
                <OrderStatus status={order.status} />
              </Styles.OrderHeader>
              <Styles.OrderDetails>
                <Styles.OrderInfo>
                  <strong>Име:</strong> {order.firstName} {order.lastName}<br />
                  <strong>Държава:</strong> {order.country}<br />
                  <strong>Град:</strong> {order.city}<br />
                  <strong>Адрес:</strong> {order.address}<br />
                  <strong>Телефон:</strong> {order.phone}
                </Styles.OrderInfo>
                <Styles.ProductList>
                  {order.products.map((product, index) => (
                    <Styles.ProductItem key={index}>
                      <Styles.ProductImage src={'/images/' + product.image} alt={product.name} />
                      <Styles.ProductInfo>
                        <Styles.ProductName>{product.name}</Styles.ProductName>
                        <Styles.ProductDetails>
                          {product.quantity} x {product.price} лв.
                        </Styles.ProductDetails>
                      </Styles.ProductInfo>
                    </Styles.ProductItem>
                  ))}
                </Styles.ProductList>
                <Styles.OrderTotal>
                  Обща сума: {order.totalPrice} лв.
                </Styles.OrderTotal>
              </Styles.OrderDetails>
            </Styles.OrderCard>
          ))}
        </Styles.ContentContainer>
      </Styles.PageContainer>
      <Footer />
    </>
  );
};

export default MyOrders;