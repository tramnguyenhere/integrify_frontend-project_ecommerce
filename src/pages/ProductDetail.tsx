import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Helmet from '../components/Helmet'
import useAppSelector from '../hooks/useAppSelector'
import { Product } from '../types/Product'
import './ProductDetail.scss'
import ReviewForm from '../components/ReviewForm'
import SingleReview from '../components/SingleReview'
import { Review } from '../types/Review'

const ProductDetail = () => {
  const { products, loading, error } = useAppSelector(state => state.products)
  const reviews = useAppSelector(state => state.reviews.reviews)
  
  const { id } = useParams()
  const selectedProduct = products && products.find((product: Product) => product.id === Number(id))
  
  const [mainImage, setMainImage] = useState(selectedProduct?.images[0])
  const [tab, setTab] = useState('description')

  useEffect(() => {
    setMainImage(selectedProduct?.images[0])
  },[selectedProduct])

  
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
        <div className='product__container'>
          <section className="product-details">
            <div className="product-details__images">
              {selectedProduct?.images.map((image, index) => (
                <div key={`image--${index}`} className="product-details__image">
                  <img src={image} alt='product' onClick={()=>setMainImage(image)}/>
                </div>
              ))}
            </div>
            <div className="product-details__image--main">
              <img src={mainImage} alt="product-highlight" />
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
          <section className="product-description">
            <nav className="product-description__tab">
              <h2 className={`product-description__tab__header ${tab === 'description' ? 'tab__active' : ''}`} onClick={()=>setTab('description')}>Description</h2>
              <h2 className={`product-description__tab__header ${tab === 'description' ? '' : 'tab__active'}`} onClick={()=>setTab('review')}>Review</h2>
            </nav>
            {tab === 'description' ? (
              <div className='product-description__tab__content'>
                <p>{selectedProduct?.description}</p>
              </div>
            ) : (
                <div className='product-description__tab__review'>
                  {reviews.map((review: Review) => (
                    <div key={review.id}>
                      <SingleReview name={review.name} email={review.email} feedback={review.feedback} />
                    </div>
                  ))}
                  <ReviewForm />
                </div>
            )}
          </section>
        </div>
      </Helmet>
    )
}

export default ProductDetail