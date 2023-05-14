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
      <div key={product.id}>
        <ProductCard id={product.id} description={product.description} title={product.title} price={product.price} images={product.images} />
      </div>
    ))}</div>
  )
}

export default Products