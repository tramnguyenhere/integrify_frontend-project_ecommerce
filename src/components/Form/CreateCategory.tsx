import React from 'react'
import { useForm } from 'react-hook-form';
import { Category } from '../../types/Category';
import useAppDispatch from '../../hooks/useAppDispatch';
import { createNewCategory } from '../../redux/reducers/categoriesReducer';

const CreateCategory = ({setToggleCreateCategory}: {setToggleCreateCategory: React.Dispatch<React.SetStateAction<boolean>>}) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<Omit<Category, 'id'>>();
  
    const dispatch = useAppDispatch();
  
    const onSubmit = (data: Omit<Category, 'id'>) => {
      const newCategory = {...data};
  
      dispatch(createNewCategory(newCategory));
      setToggleCreateCategory(false);
    };
  
    return (
      <form className="form--pop-up form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form__group">
          <input
            type="text"
            placeholder="Name"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <span className="form--error">This field is required!</span>
          )}
        </div>
        <div className="form__group">
          <input
            type="url"
            placeholder="Image URL"
            {...register("image", { required: true })}
          />
          {errors.image && (
            <span className="form--error">This field is required!</span>
          )}
        </div>
        <button type="submit" className="form__button">
          Create Category
        </button>
      </form>
    );
  };

export default CreateCategory