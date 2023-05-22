import React, { useState, useEffect } from 'react';

import useAppSelector from '../hooks/useAppSelector';
import Helmet from '../components/Helmet';
import ProductCard from '../components/Product/ProductCard';
import Pagination from '../components/Pagination';
import Loading from './Loading';
import SearchBar from '../components/SearchBar';
import { Product } from '../types/Product';

const Products = () => {
  const { products, loading, error } = useAppSelector(
    (state) => state.products
  );

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Product[] | undefined>(
    products
  );

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      return setSearchResults(
        products.filter((product: Product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [products, searchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const [currentPage, setCurrentPage] = useState(1);
  const productPerPage = 15;

  // Calculate the index range for the current page
  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProducts = searchResults?.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  } else if (error) {
    return <>{error}</>;
  }
  return (
    <Helmet title='Products'>
      <div className='products__wrapper'>
        <h1 className='page__header'>Products</h1>
        <SearchBar handleInputChange={handleInputChange} />
        <div className='products'>
          {currentProducts?.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                description={product.description}
                title={product.title}
                price={product.price}
                images={product.images}
              />
          ))}
        </div>
        <Pagination
          productsPerPage={productPerPage}
          totalProducts={currentProducts ? currentProducts.length : 0}
          paginate={paginate}
        />
      </div>
    </Helmet>
  );
};

export default Products;
