import React, { useEffect } from "react";

import Layout from "./components/Layout";
import useAppDispatch from "./hooks/useAppDispatch";
import { fetchAllProducts } from "./redux/reducers/productsReducer";
import "./assets/styles/styles.scss";
import { fetchAllUsers, login } from "./redux/reducers/usersReducer";
import { fetchAllCategories } from "./redux/reducers/categoriesReducer";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(fetchAllUsers());
    dispatch(fetchAllCategories());

    const isAuthenticated = localStorage.getItem("token");
    const storedCredentials = JSON.parse(
      localStorage.getItem("userCredential") ?? ""
    );
    const email = storedCredentials.email;
    const password = storedCredentials.password;

    if (isAuthenticated && storedCredentials !== "") {
      dispatch(login({ email, password }));
    }
  }, [dispatch]);

  return (
    <>
      <Layout />
    </>
  );
};

export default App;
