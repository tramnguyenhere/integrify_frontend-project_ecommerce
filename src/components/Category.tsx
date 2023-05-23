import React, {useEffect} from 'react';
import useAppSelector from '../hooks/useAppSelector';
import Loading from '../pages/Loading';
import Error from '../pages/Error';
import useAppDispatch from '../hooks/useAppDispatch';
import { fetchAllProductsByCategoryId, resetCategory, setCategory } from '../redux/reducers/categoriesReducer';


const Category = () => {
  const { categories, selectedCategoryId, loading, error } = useAppSelector(
    (state) => state.categories
  );
  const { products } = useAppSelector(
    (state) => state.products
  );
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (selectedCategoryId === 0) {
      dispatch(resetCategory(products))
    } else {
      dispatch(fetchAllProductsByCategoryId(selectedCategoryId))
    }
  },[dispatch, products, selectedCategoryId])
  
  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  } else if (error) {
    return (
      <>
        <Error error={error} />
      </>
    );
  }
  return (
    <div className='categories'>
      {categories.map((category) => (
        <button
          onClick={()=>dispatch(setCategory(category.id))}
          className={`${
            selectedCategoryId === category.id
              ? 'fit-button__primary'
              : 'fit-button__secondary'
          } category`}
          key={category.id}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default Category;
