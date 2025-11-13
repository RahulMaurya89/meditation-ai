import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'

//Performance: import only critical components initially
import Nav from './components/nav/Nav';
import Footer from './components/footer/Footer';
// import FloatingTelegram from './components/FloatingTelegram/FloatingTelegram';
import Login from './components/auth/Login';
import BottomNav from './components/BottomNav/BottomNav';

// Performance: Lazy load non-critical route components
const Hero = lazy(() => import('./components/hero/Hero'));
const ContactUs = lazy(() => import('./components/contact/ContactUs'));
const Features = lazy(() => import('./components/Features/features'));
const Pricing = lazy(() => import('./components/pricing/Pricing'));
// const PaymentSuccess = lazy(() => import('./components/payment/PaymentSuccess'));
const Dashboard = lazy(() => import('./components/dashboard/Dashboard'));

// Performance: Reusable loading component
const PageLoader = () => (
  <div className="page-loader" role="status" aria-live="polite">
    <div className="loader-spinner"></div>
    <span className="sr-only">Loading page content...</span>
  </div>
);

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <main className="main-content">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/features" element={<Features />} />
              <Route path="/pricing" element={<Pricing />} />
              {/* <Route path="/payment/success" element={<PaymentSuccess />} /> */}
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        {/* <FloatingTelegram /> */}
        <BottomNav />

      </div>
     
    </BrowserRouter>
  )
}

export default App
