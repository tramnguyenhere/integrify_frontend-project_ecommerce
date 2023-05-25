import categoriesReducer, {createNewCategory, emptyCategoriesReducer, fetchAllCategories, setCategory} from "../../redux/reducers/categoriesReducer";
import { category1, category2, category3 } from "../data/categories";
import categoryServer from "../servers/categoryServer";
import store from "../shared/store";

beforeAll(() => {
  categoryServer.listen();
});

afterAll(() => {
  categoryServer.close();
});


beforeEach(() => {
  store.dispatch(emptyCategoriesReducer());
  store.dispatch(createNewCategory(category1));
  store.dispatch(createNewCategory(category2));
  store.dispatch(createNewCategory(category3));
});

describe('Test categoriesReducer', () => {
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

  test('Check fetchAllCategories', async () => {
    await store.dispatch(fetchAllCategories());
    expect(store.getState().categoriesReducer.categories.length).toBe(4); //There is category named "All" always been already when we fetch other categories in the server
  });
});
