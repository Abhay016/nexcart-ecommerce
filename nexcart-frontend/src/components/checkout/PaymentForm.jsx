import { Skeleton } from '@mui/material';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';

const PaymentForm = ({ clientSecret, totalPrice }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${import.meta.env.VITE_FRONTEND_URL}/order-confirm`,
      },
    });

    if (error) {
      setErrorMessage(error.message);
    }
  };

  const paymentElementOptions = {
    layout: 'tabs',
  };

  const isLoading = !clientSecret || !stripe || !elements;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md space-y-6"
    >
      {/* Header */}
      <h2 className="text-2xl font-semibold text-slate-900 border-b pb-3">
        Payment Information
      </h2>

      {/* Payment Element */}
      {isLoading ? (
        <Skeleton variant="rectangular" height={80} />
      ) : (
        <>
          {clientSecret && (
            <PaymentElement options={paymentElementOptions} />
          )}

          {/* Error message */}
          {errorMessage && (
            <div className="text-red-600 mt-3 text-sm font-medium bg-red-50 border border-red-200 rounded-md p-2">
              {errorMessage}
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={!stripe || isLoading}
            className={`w-full mt-4 py-3 rounded-md font-semibold text-white shadow-md transition-all ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed animate-pulse'
                : 'bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900'
            }`}
          >
            {!isLoading
              ? `Pay $${Number(totalPrice).toFixed(2)}`
              : 'Processing...'}
          </button>
        </>
      )}
    </form>
  );
};

export default PaymentForm;
