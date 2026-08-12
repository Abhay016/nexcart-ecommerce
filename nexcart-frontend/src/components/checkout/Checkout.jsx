import { Button, Step, StepLabel, Stepper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddressInfo from './AddressInfo';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAddresses } from '../../store/actions';
import toast from 'react-hot-toast';
import Skeleton from '../shared/Skeleton';
import ErrorPage from '../shared/ErrorPage';
import PaymentMethod from './PaymentMethod';
import OrderSummary from './OrderSummary';
import StripePayment from './StripePayment';
import PaypalPayment from './PaypalPayment';

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch();
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const { cart, totalPrice } = useSelector((state) => state.carts);
  console.log(cart);
  const { address, selectedUserCheckoutAddress } = useSelector(
    (state) => state.auth
  );
  const { paymentMethod } = useSelector((state) => state.payment);

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleNext = () => {
    if (activeStep === 0 && !selectedUserCheckoutAddress) {
      toast.error('Please select checkout address before proceeding.');
      return;
    }

    if (activeStep === 1 && (!selectedUserCheckoutAddress || !paymentMethod)) {
      toast.error('Please select payment method before proceeding.');
      return;
    }

    setActiveStep((prevStep) => prevStep + 1);
  };

  const steps = ['Address', 'Payment Method', 'Order Summary', 'Payment'];

  useEffect(() => {
    dispatch(getUserAddresses());
  }, [dispatch]);

  return (
    <div className="py-14 min-h-[calc(100vh-100px)] bg-gray-50">
      {/* Stepper */}
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        sx={{
          mb: 4,
          '& .MuiStepIcon-root.Mui-active': { color: '#2563eb' },
          '& .MuiStepIcon-root.Mui-completed': { color: '#1e40af' },
        }}
      >
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Content */}
      <div className="lg:w-[80%] mx-auto">
        {isLoading ? (
          <Skeleton />
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6 transition-all">
            {activeStep === 0 && <AddressInfo address={address} />}
            {activeStep === 1 && <PaymentMethod />}
            {activeStep === 2 && (
              <OrderSummary
                totalPrice={totalPrice}
                cart={cart}
                address={selectedUserCheckoutAddress}
                paymentMethod={paymentMethod}
              />
            )}
            {activeStep === 3 &&
              (paymentMethod === 'Stripe' ? (
                <StripePayment />
              ) : (
                <PaypalPayment />
              ))}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div
        className="flex justify-between items-center px-6 fixed bottom-0 left-0 w-full h-20 bg-white border-t shadow-md"
        style={{ backdropFilter: 'blur(6px)' }}
      >
        <Button
          variant="outlined"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ borderColor: '#2563eb', color: '#2563eb' }}
        >
          Back
        </Button>

        {activeStep !== steps.length - 1 && (
          <Button
            variant="contained"
            sx={{
              background: 'linear-gradient(90deg, #2563eb, #1e40af)',
              color: 'white',
              px: 4,
              '&:hover': {
                background: 'linear-gradient(90deg, #1e40af, #2563eb)',
              },
            }}
            disabled={
              errorMessage ||
              (activeStep === 0 && !selectedUserCheckoutAddress) ||
              (activeStep === 1 && !paymentMethod)
            }
            onClick={handleNext}
          >
            Proceed
          </Button>
        )}
      </div>

      {/* Error */}
      {errorMessage && <ErrorPage message={errorMessage} />}
    </div>
  );
};

export default Checkout;
