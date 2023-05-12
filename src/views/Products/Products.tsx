import React from 'react'
import useAppSelector from '../../hooks/useAppSelector'

const Products = () => {
  const { products, loading, error } = useAppSelector(state => state.productsReducer)

  if (loading) {
    return <>
    Loading...
    </>
  }
  return (
    <div>{products.map(product => (
      <p key={product.id}>{product.title}</p>
    ))}</div>
  )
}

export default Products