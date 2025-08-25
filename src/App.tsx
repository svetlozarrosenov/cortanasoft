import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/home/Home';
import Login from './components/login/Login';
import Register from './components/register/Register';
import About from './components/about/About';
import Contacts from './components/contacts/Contacts';
import AdminDashboard from './components/admin/AdminDashboard';
import AlarmPage from './components/alarms/Alarms';
import ProductsPage from './components/products/Products';
import ProductDetail from './components/products/ProductDetails';
import { CartProvider } from './components/cart/CartContext';
import CheckoutPage from './components/checkout';
import OrderConfirmation from './components/order-confirmation/OrderConfirmation';
import MyOrders from './components/orders';
import AuthGuard from './components/guards/AuthGuard';
import RoleGuard from './components/guards/RoleGuard';
import ReactGA from 'react-ga4';
import RegistrationConfirmation from './components/register/RegistrationConfirmation';
import ConfirmationPage from './components/user-confirmation';
import MyDevices from './components/my-devices';
import Services from './components/services';
import FAQ from './components/faq';
import Terms from './components/terms';
import ForgotPassword from './components/forgot-password';
import ResetPassword from './components/reset-password';
import CoverageMap from './components/coverage-map';
import SubscribedDevices from './components/subscribed-devices';

if(import.meta.env.NODE_ENV === 'production') {
  ReactGA.initialize(import.meta.env.VITE_GA as string);
}

const App: React.FC = () => {
  useEffect(() => {
    if(import.meta.env.NODE_ENV !== 'production') {
      return;
    }
    ReactGA.send({ hitType: "pageview", page: window.location.pathname + window.location.search });
  }, []);
  
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route element={<AuthGuard />}>
            <Route element={<RoleGuard />}>
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>
            <Route path="/my-devices" element={<MyDevices />} />
            <Route path="/subscribed-devices" element={<SubscribedDevices />} />
            <Route path="/alarms" element={<AlarmPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/my-orders" element={<MyOrders />} />
          </Route>
          <Route path="/about" element={<About />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/registration-confirmation" element={<RegistrationConfirmation />} />
          <Route path="/register/confirm" element={<ConfirmationPage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/map' element={<CoverageMap />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;