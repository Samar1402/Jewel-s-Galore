import { React } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import About from "./Components/About";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import ForgotPassword from "./Components/ForgotPassword";
import ContactUs from "./Components/ContactUs";
import RefundPolicy from "./Components/RefundPolicy";
import FAQ from "./Components/FAQ";
import Products from "./Components/Products";
import Cart from "./Components/Cart";
import Dashboard from "./pages/Dashboard";
import OrderHistory from "./pages/OrderHistory";
import Profile from "./pages/Profile";
import Address from "./pages/Address";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="about" element={<About />}></Route>
        <Route path="products" element={<Products />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="signup" element={<SignUp />}></Route>
        <Route path="forgot" element={<ForgotPassword />}></Route>
        <Route path="contact" element={<ContactUs />}></Route>
        <Route path="refund" element={<RefundPolicy />}></Route>
        <Route path="faq" element={<FAQ />}></Route>
        <Route path="cart" element={<Cart />}></Route>
        <Route path="dashboard" element={<Dashboard/>}></Route>
        <Route path="profile" element={<Profile/>}></Route>
        <Route path="orders" element={<OrderHistory/>}></Route>
        <Route path="address" element={<Address/>}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
