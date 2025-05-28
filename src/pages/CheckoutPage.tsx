import React, { useState } from 'react';
import { FiChevronRight, FiCheck, FiShoppingBag, FiCreditCard, FiTruck, FiCheckCircle } from 'react-icons/fi';
import Navbar from '../components/organisms/Navbar';
import Footer from '../components/organisms/Footer';
import CartSummary from '../components/organisms/CartSummary';
import ShippingForm from '../components/organisms/ShippingForm';
import PaymentForm from '../components/organisms/PaymentForm';
import OrderConfirmation from '../components/organisms/OrderConfirmation';
import './CheckoutPage.css';

// Constantes para los pasos del checkout
const CheckoutStep = {
  CART: 1,
  SHIPPING: 2,
  PAYMENT: 3,
  CONFIRMATION: 4
} as const;

// Componente CheckoutPage: Página del proceso de compra
// Este componente gestiona el flujo completo del proceso de checkout
const CheckoutPage: React.FC = () => {
  // Estado para controlar el paso actual del checkout
  const [currentStep, setCurrentStep] = useState<number>(CheckoutStep.CART);
  
  // Estado para almacenar los datos del formulario de envío
  const [shippingData, setShippingData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    province: '',
    postalCode: '',
    shippingMethod: 'standard'
  });
  
  // Estado para almacenar los datos del formulario de pago
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    paymentMethod: 'credit_card'
  });

  // Función para avanzar al siguiente paso
  const goToNextStep = () => {
    setCurrentStep((prevStep: number) => {
      const nextStep = prevStep + 1;
      return nextStep <= CheckoutStep.CONFIRMATION ? nextStep : prevStep;
    });
    // Scroll al inicio de la página
    window.scrollTo(0, 0);
  };

  // Función para retroceder al paso anterior
  const goToPreviousStep = () => {
    setCurrentStep((prevStep: number) => {
      const prevStepValue = prevStep - 1;
      return prevStepValue >= CheckoutStep.CART ? prevStepValue : prevStep;
    });
    // Scroll al inicio de la página
    window.scrollTo(0, 0);
  };

  // Función para manejar los cambios en el formulario de envío
  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setShippingData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Función para manejar los cambios en el formulario de pago
  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPaymentData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Función para manejar el envío del formulario de envío
  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    goToNextStep();
  };

  // Función para manejar el envío del formulario de pago
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    goToNextStep();
  };

  // Renderizar el contenido según el paso actual
  const renderStepContent = () => {
    switch (currentStep) {
      case CheckoutStep.CART:
        return <CartSummary onContinue={goToNextStep} />;
      case CheckoutStep.SHIPPING:
        return (
          <ShippingForm 
            shippingData={shippingData}
            onChange={handleShippingChange}
            onSubmit={handleShippingSubmit}
            onBack={goToPreviousStep}
          />
        );
      case CheckoutStep.PAYMENT:
        return (
          <PaymentForm 
            paymentData={paymentData}
            onChange={handlePaymentChange}
            onSubmit={handlePaymentSubmit}
            onBack={goToPreviousStep}
          />
        );
      case CheckoutStep.CONFIRMATION:
        return (
          <OrderConfirmation 
            shippingData={shippingData}
            paymentData={paymentData}
          />
        );
      default:
        return <CartSummary onContinue={goToNextStep} />;
    }
  };

  // Obtener el icono para cada paso
  const getStepIcon = (step: number) => {
    switch (step) {
      case CheckoutStep.CART:
        return <FiShoppingBag />;
      case CheckoutStep.SHIPPING:
        return <FiTruck />;
      case CheckoutStep.PAYMENT:
        return <FiCreditCard />;
      case CheckoutStep.CONFIRMATION:
        return <FiCheckCircle />;
    }
  };

  return (
    <div className="checkout-page">
      <Navbar />
      
      <main className="checkout-main">
        <div className="container">
          <h1 className="checkout-title">Finalizar Compra</h1>
          
          {/* Indicador de pasos */}
          <div className="checkout-steps">
            {Object.values(CheckoutStep).filter(step => !isNaN(Number(step))).map((step) => {
              const stepNumber = Number(step);
              const isActive = currentStep === stepNumber;
              const isCompleted = currentStep > stepNumber;
              
              return (
                <div 
                  key={stepNumber}
                  className={`checkout-step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                >
                  <div className="step-icon">
                    {isCompleted ? <FiCheck /> : getStepIcon(stepNumber)}
                  </div>
                  <div className="step-label">
                    {stepNumber === CheckoutStep.CART && 'Carrito'}
                    {stepNumber === CheckoutStep.SHIPPING && 'Envío'}
                    {stepNumber === CheckoutStep.PAYMENT && 'Pago'}
                    {stepNumber === CheckoutStep.CONFIRMATION && 'Confirmación'}
                  </div>
                  {stepNumber < CheckoutStep.CONFIRMATION && (
                    <div className="step-connector">
                      <FiChevronRight />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          {/* Contenido del paso actual */}
          <div className="checkout-content">
            {renderStepContent()}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CheckoutPage;
