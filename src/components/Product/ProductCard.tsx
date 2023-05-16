import React from 'react'
import { Link } from 'react-router-dom'

import { Product } from '../../types/Product'

const ProductCard = ({ title, price, images, description, id }: Product) => {
  return (
      <article className='product-card'>
          <Link to={`/products/${id}`}>
              <img className='product-card__image' alt={title} src={images[0]} />
          </Link>
          <section className='product-card__information'>
              <h3 className='product-card__information__title'>{title}</h3>
              <p className='product-card__information__price'>${price}</p>
              <p className='product-card__information__description'>{description}</p>
          </section>
          <div className='product-card__buttons'>
              <Link to={`/products/${id}`} id='more-details' className='product-card__button'>
                  More details
              </Link>
              <button id='add-cart' className='product-card__button'>Add to cart</button>
          </div>
      </article>
  )
}

export default ProductCard