import React from 'react'
import { useParams } from 'react-router-dom'

import Helmet from '../../components/Helmet/Helmet'
import useAppSelector from '../../hooks/useAppSelector'
import { Product } from '../../types/Product'
import './ProductDetail.scss'

const ProductDetail = () => {
  const { products, loading, error } = useAppSelector(state => state.productsReducer)
  const { id } = useParams()
  const selectedProduct = products && products.find((product: Product) => product.id === Number(id))
  
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
      <Helmet title='Product Details'>
        <section className="product-details">
          <div className="product-details__images">
            {selectedProduct?.images.map((image, index) => (
              <div key={`image--${index}`} className="product-details__image">
                <img src={image} alt='product' />
              </div>
            ))}
          </div>
          <div className="product-details__image--main">
            <img src={selectedProduct?.images[0]} alt="product-highlight" />
          </div>
          <div className="product-details__information">
            <h3 className="product-details__information__title">
              {selectedProduct?.title}
            </h3>
            <div className="product-details__information__price">
              <h4>Price: </h4>
              <p>${selectedProduct?.price}</p>
            </div>
            <div className="product-details__information__category">
              <h4>Category:</h4>
              <p>{selectedProduct?.category?.name}</p>
            </div>
            <button className="product-details__information__button">Add to Cart</button>
          </div>
        </section>
      </Helmet>
    )
}

export default ProductDetail