import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ProductUpdate } from '../../types/ProductUpdate';
import useAppSelector from '../../hooks/useAppSelector';
import useAppDispatch from '../../hooks/useAppDispatch';
import {
  deleteSingleProduct,
  updateSingleProduct,
} from '../../redux/reducers/productsReducer';

const EditProductForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { products } = useAppSelector((state) => state.products);
  const { categories } = useAppSelector((state) => state.categories);
  const { id } = useParams();

  const toBeEditedProduct = products.filter(
    (product) => product.id === Number(id)
  )[0];

  const [newTitle, setNewTitle] = useState(toBeEditedProduct?.title);
  const [newDescription, setNewDescription] = useState(
    toBeEditedProduct?.description
  );
  const [newPrice, setNewPrice] = useState(toBeEditedProduct?.price);
  const [newCategory, setNewCategory] = useState(
    toBeEditedProduct?.category!.id
  );
  const [newImage, setNewImage] = useState(toBeEditedProduct?.images);

  const editFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (toBeEditedProduct) {
      const updatedProduct: ProductUpdate = {
        id: Number(id),
        update: {
          title: newTitle,
          price: newPrice,
          category: categories.find((category) => category.id === newCategory),
          images: newImage,
          description: newDescription,
        },
      };
      dispatch(updateSingleProduct(updatedProduct));
      navigate('/products');
    }
  };

  const deleteProductHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(deleteSingleProduct(Number(id)));
    navigate('/products');
  };

  return (
    <form className='form' onSubmit={editFormHandler}>
      <div className='form__group'>
        <h3 className='user-profile--edit__section__header'>Title</h3>
        <input
          placeholder='Change Title'
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
      </div>
      <div className='form__group'>
        <h3 className='user-profile--edit__section__header'>Price</h3>
        <input
          placeholder='Change price'
          value={newPrice}
          onChange={(e) => setNewPrice(Number(e.target.value))}
        />
      </div>
      <div className='form__group'>
        <h3 className='user-profile--edit__section__header'>Description</h3>
        <input
          placeholder='Change description'
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
      </div>
      <div className='form__group'>
        <h3 className='user-profile--edit__section__header'>Category</h3>
        <select
          value={newCategory}
          onChange={(e) => setNewCategory(Number(e.target.value))}
        >
          {categories.map(
            (category) =>
              category.id !== 0 && (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              )
          )}
        </select>
      </div>
      <div className='form__group'>
        <h3 className='user-profile--edit__section__header'>Image</h3>
        <input
          placeholder='Change image'
          value={newImage[0]}
          onChange={(e) => setNewImage([e.target.value])}
        />
      </div>
      <button className='full-width-button__primary' type='submit'>
        Save
      </button>
      <button
        className='full-width-button__secondary'
        onClick={deleteProductHandler}
      >
        Delete
      </button>
    </form>
  );
};

export default EditProductForm;
