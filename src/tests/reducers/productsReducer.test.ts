import {
  fetchAllProducts,
} from '../../redux/reducers/productsReducer';
import productServer from '../servers/productServer';
import store from '../shared/store';

beforeAll(() => {
  productServer.listen();
});

afterAll(() => {
  productServer.close();
});

describe('Test productsReducer', () => {
  test('Check initial state', () => {
    expect(store.getState().productsReducer).toEqual({
      loading: false,
      filteredProducts: [],
      error: '',
      products: [],
    });
  });
  test('Check fetchAllProducts', async () => {
    await store.dispatch(fetchAllProducts());
    expect(store.getState().productsReducer.products.length).toBe(4);
  });
});
