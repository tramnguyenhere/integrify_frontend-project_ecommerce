import React, {useEffect} from 'react'
import { useParams } from 'react-router-dom'

import Helmet from '../components/Helmet'
import useAppSelector from '../hooks/useAppSelector'
import { Product } from '../types/Product'
import ProductMainInfo from '../components/Product/ProductMainInfo'
import ProductDescription from '../components/Product/ProductDescription'
import ProductCard from '../components/Product/ProductCard'

const ProductDetail = () => {
  const { products, loading, error } = useAppSelector(state => state.products)
  const { id } = useParams()
  const selectedProduct = products && products.find((product: Product) => product.id === Number(id))
  const relatedProducts = products.filter((product) => product.category?.name === selectedProduct?.category?.name)
  const relatedProductsLimit = relatedProducts.slice(0,10)
  
  useEffect(() => {
    window.scrollTo(0,0)
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
          <ProductMainInfo selectedProduct={selectedProduct} />
          <ProductDescription selectedProduct={selectedProduct} />
          <div className="related-products">
            <h3 className="related-products__header">
              You might also like
            </h3>
            <div className="related-products__product-cards">
            {
              relatedProductsLimit.map(product => (
                <ProductCard key={product.id} title={product.title} price={product.price} images={product.images} description={product.description} id={product.id} />
              ))
            }
            </div>
          </div>
        </div>
      </Helmet>
    )
}

export default ProductDetail