import React, { useState } from "react";
import useAppSelector from "../../hooks/useAppSelector";
import CreateCategory from "../../components/Form/CreateCategory";
import EditCategoryForm from "../../components/Form/EditCategoryForm";

const CategoryManagement = () => {
  const { categories } = useAppSelector((state) => state.categories);
  const [toggleCreateCategory, setToggleCreateCategory] = useState(false);
  return (
    <div className="category-management">
      <button
        className="full-width-button__primary"
        onClick={() => setToggleCreateCategory(true)}
      >
        Add category
      </button>
      {toggleCreateCategory && (
        <div>
          <div className="overlay"></div>
          <CreateCategory setToggleCreateCategory={setToggleCreateCategory} />
        </div>
      )}
      <div className="category-management__list">
        {categories.map((category) => (
          <div key={category.id} className="category-management__item">
            <p>{category.name}</p>
            <div className="category-management__buttons">
              <EditCategoryForm category={category} />
              <button className="category-management__button fit-button__primary">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryManagement;
