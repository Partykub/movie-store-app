import React from 'react';

const Cart = ({ cart, prices, onRemove, onClear, onCheckout }) => {
  const getDiscountedTotal = () => {
    const total = cart.reduce((sum, item) => sum + (prices[item.id] || 0), 0);
    if (cart.length > 5) return total * (100 - 20)/100;
    if (cart.length > 3) return total * (100 - 10) / 100;
    return total;
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">🛒 Cart</h2>
      {cart.map(item => (
        <div key={item.id} className="flex justify-between items-center mb-2 border p-2 bg-white">
          <div>
            <strong>{item.title}</strong>
            <div className="text-sm">Price: ฿{prices[item.id] || 0}</div>
          </div>
          <button className="text-red-500" onClick={() => onRemove(item.id)}>Remove</button>
        </div>
      ))}
      <div className="font-bold mt-2">Total: ฿{getDiscountedTotal().toFixed(2)}</div>
      <div className="text-sm text-gray-600">(Buy {'>'} 3 = 10% off, {'>'} 5 = 20% off)</div>
      <div className="flex gap-2 mt-4">
        <button className="bg-yellow-500 text-white px-4" onClick={onClear}>Clear Cart</button>
        <button className="bg-purple-600 text-white px-4" onClick={onCheckout}>Checkout</button>
      </div>
    </div>
  );
};

export default Cart;