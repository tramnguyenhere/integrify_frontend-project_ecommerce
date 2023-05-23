import React from "react";

import Header from "./Header";
import Routes from "../routes/Routers";
import Footer from "./Footer";
import useAppSelector from "../hooks/useAppSelector";
import Cart from "./Cart/Cart";

const Layout = () => {
  const isSideCartVisible = useAppSelector(
    (state) => state.cart.isSideCartVisible
  );

  return (
    <div className="layout">
      <Header />
      {isSideCartVisible && <Cart />}
      <div>
        <Routes />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
