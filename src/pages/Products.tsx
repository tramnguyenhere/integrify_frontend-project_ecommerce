import React, {useState} from 'react'

import useAppSelector from '../hooks/useAppSelector'
import ProductCard from '../components/Product/ProductCard'
import Pagination from '../components/Pagination'

const Products = () => {
  const { products, loading, error } = useAppSelector(state => state.products)

  const [currentPage, setCurrentPage] = useState(1);
  const productPerPage = 15;

  // Calculate the index range for the current page
  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber:number) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <>
        Loading...
      </>
    )
  } else if (error) {
    return (
      <>
        {error}
      </>
    )
  }
  return (
    <div className="products__wrapper">
      <div className='products'>
      {currentProducts.map((product) => (
        <div key={product.id}>
          <ProductCard
            id={product.id}
            description={product.description}
            title={product.title}
            price={product.price}
            images={product.images}
          />
        </div>
      ))}
      </div>
      <Pagination
        productsPerPage={productPerPage}
        totalProducts={products.length}
        paginate={paginate}
      />
    </div>
  )
}

export default Products