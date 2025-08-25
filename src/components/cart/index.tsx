import React from 'react';
import { useCart } from './CartContext';
import { Styles } from './styles';

interface CartPopupProps {
  onClose: () => void;
}

const CartPopup: React.FC<CartPopupProps> = ({ onClose }) => {
  const { cart, removeFromCart } = useCart();

  return (
    <Styles.CartPopupContainer>
      {cart.items.length === 0 ? (
        <Styles.EmptyCart>
          <p>Вашата количка е празна</p>
          <Styles.LinkButton to="/products" onClick={onClose}>Разгледайте продуктите</Styles.LinkButton>
        </Styles.EmptyCart>
      ) : (
        <>
          {cart.items.map((item: any, index: number) => (
            <Styles.CartItem key={index}>
              <Styles.ProductImage src={'/images/' + item.image} alt={item.name} />
              <Styles.ProductInfo>
                <Styles.ProductName>{item.name}</Styles.ProductName>
                <Styles.ProductQuantity>Количество: {item.quantity}</Styles.ProductQuantity>
                <Styles.ProductPrice>{item.price} лв.</Styles.ProductPrice>
              </Styles.ProductInfo>
              <Styles.RemoveButton onClick={() => removeFromCart(item.id)}>
                &#10005;
              </Styles.RemoveButton>
            </Styles.CartItem>
          ))}
          <Styles.CartTotal>
            Обща сума: {cart.total.toFixed(2)} лв.
          </Styles.CartTotal>
          <Styles.CheckoutButton to="/checkout" onClick={onClose}>Към плащане</Styles.CheckoutButton>
        </>
      )}
    </Styles.CartPopupContainer>
  );
};

export default CartPopup;