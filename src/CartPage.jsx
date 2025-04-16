import React, { useEffect, useState } from 'react';
import Cart from './components/Cart';
import PaymentPopup from './components/PaymentPopup';

const CartPage = () => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [prices, setPrices] = useState(() => {
    const saved = localStorage.getItem('prices');
    return saved ? JSON.parse(saved) : {};
  });

  const [showPopup, setShowPopup] = useState(false);
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    let timer;
    if (showPopup) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setShowPopup(false);
            return 60;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [showPopup]);

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      <Cart
        cart={cart}
        prices={prices}
        onRemove={removeFromCart}
        onClear={clearCart}
        onCheckout={() => setShowPopup(true)}
      />

      {showPopup && <PaymentPopup countdown={countdown} />}
    </div>
  );
};

export default CartPage;