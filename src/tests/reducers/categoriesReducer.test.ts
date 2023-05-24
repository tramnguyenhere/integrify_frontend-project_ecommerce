import categoriesReducer, {setCategory} from "../../redux/reducers/categoriesReducer";

describe('categoriesReducer', () => {
  const initialState = {
    categories: [],
    selectedCategoryId: 0,
    loading: false,
    error: '',
    isCreateCategoryVisible: false
  };

  it('should handle setCategory', () => {
    const action = setCategory(1);
    const newState = categoriesReducer(initialState, action);

    expect(newState.selectedCategoryId).toEqual(1);
  });

  // Add more test cases as needed for other actions and scenarios
});
