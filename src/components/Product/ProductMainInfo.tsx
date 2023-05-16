import React, {useState, useEffect} from 'react'
import { Product } from '../../types/Product'

interface ProductMainInfoProps {
    selectedProduct?: Product
}

const ProductMainInfo = ({selectedProduct}:ProductMainInfoProps) => {
    const [mainImage, setMainImage] = useState(selectedProduct?.images[0])

    useEffect(() => {
        setMainImage(selectedProduct?.images[0])
      },[selectedProduct])

    return (
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
    )
}

export default ProductMainInfo