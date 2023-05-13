import React from 'react'
import { Link } from 'react-router-dom'

import useAppSelector from '../../hooks/useAppSelector'
import ProductCard from '../../components/ProductCard/ProductCard'
import './Products.scss'

const Products = () => {
  const { products, loading, error } = useAppSelector(state => state.productsReducer)

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
    <div className='products'>
      {products.map(product => (
      <Link to={`${product.id}`} key={product.id}>
        <ProductCard description={product.description} title={product.title} price={product.price} images={product.images} />
      </Link>
    ))}</div>
  )
}

export default Products