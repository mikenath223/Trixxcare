import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import PropTypes from 'prop-types';
import './Checkout.css';


const Checkout = ({ SweetAlert, handleCancel, handleConfirmed }) => {
  const [err, setErr] = useState({ show: false, msg: '' });
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async event => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const cardElement = elements.getElement(CardElement);
    const { error } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });
    if (error) {
      setErr({ err: true, msg: error.message });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="stripe-form">
      <p className="stripe-label">
        <h2>Enter Card details</h2>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <button type="submit" disabled={!stripe} className="stripe-button">
          Pay
        </button>
      </p>
      {err.show ? (
        <SweetAlert
          error
          title={err.message}
          onConfirm={handleConfirmed}
          onCancel={handleCancel}
          timeout={3500}
        />
      ) : null}
    </form>
  );
};

Checkout.propTypes = {
  SweetAlert: PropTypes.func.isRequired,
  handleConfirmed: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
};

export default Checkout;
