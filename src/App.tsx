import React, { useEffect } from "react";

import useAppDispatch from "./hooks/useAppDispatch";
import useAppSelector from "./hooks/useAppSelector";
import { fetchAllProducts } from "./redux/reducers/productsReducer";
import { fetchAllUsers, login } from "./redux/reducers/usersReducer";
import { fetchAllCategories } from "./redux/reducers/categoriesReducer";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";
import Routes from "./routes/Routers";
import "./assets/styles/styles.scss";

const App = () => {
  const isSideCartVisible = useAppSelector(
    (state) => state.cart.isSideCartVisible
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(fetchAllUsers());
    dispatch(fetchAllCategories());

    const isAuthenticated = localStorage.getItem("token");
    const storedCredentials =
      localStorage.getItem("userCredential") !== null &&
      JSON.parse(localStorage.getItem("userCredential") ?? "");

    const email = storedCredentials.email;
    const password = storedCredentials.password;

    if (isAuthenticated && storedCredentials !== "") {
      dispatch(login({ email, password }));
    }
  }, [dispatch]);

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

export default App;
