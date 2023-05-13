import React from 'react'

import './ProductCard.scss'
import { Product } from '../../types/Product'

const ProductCard = ({title, price, images, description}: Omit<Product, 'id'>) => {
  return (
      <article className='product-card'>
          <img className='product-card__image' alt={title} src={images[0]} />
          <section className='product-card__information'>
              <h3 className='product-card__information__title'>{title}</h3>
              <p className='product-card__information__price'>${price}</p>
              <p className='product-card__information__description'>{description}</p>
          </section>
          <div className='product-card__buttons'>
              <button id='more-details' className='product-card__button'>More details</button>
              <button id='add-cart' className='product-card__button'>Add to cart</button>
          </div>
      </article>
  )
}

export default ProductCard
