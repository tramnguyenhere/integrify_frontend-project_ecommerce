import React from "react";
import Helmet from "../../components/Helmet";
import useAppSelector from "../../hooks/useAppSelector";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { products, loading, error } = useAppSelector(
    (state) => state.products
  );
  const { categories } = useAppSelector((state) => state.categories);

  return (
    <Helmet title="Dashboard">
      <div className="dashboard">
        <nav className="dashboard__navigation">
          <Link className="fit-button__primary" to="/dashboard/user-management">
            User management
          </Link>
          <Link
            className="fit-button__primary"
            to="/dashboard/product-management"
          >
            Product management
          </Link>
          <Link
            className="fit-button__primary"
            to="/dashboard/category-management"
          >
            Category management
          </Link>
        </nav>
      </div>
    </Helmet>
  );
};

export default Dashboard;
