import React, { useEffect, useState } from 'react';

const PaymentPopup = ({ countdown = 60, onClose }) => {
  const [timeLeft, setTimeLeft] = useState(countdown);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          if (onClose) onClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow text-center relative w-80">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl font-bold"
        >
          &times;
        </button>
        <h3 className="text-xl font-bold mb-2">💸 Payment Info</h3>
        <p className="mb-2">Please transfer the total amount to:</p>
        <p className="font-semibold">SCB 123-456-7890</p>
        <p className="text-red-600 mt-2">⏳ Time left: {timeLeft} seconds</p>
      </div>
    </div>
  );
};

export default PaymentPopup;