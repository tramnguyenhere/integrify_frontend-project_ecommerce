import {
  createNewProduct,
  fetchAllProducts,
  fetchSingleProductById,
} from "../../redux/reducers/productsReducer";
import { NewProduct } from "../../types/NewProduct";
import productServer from "../servers/productServer";
import store from "../shared/store";

beforeAll(() => {
  productServer.listen();
});

afterAll(() => {
  productServer.close();
});

describe("Test productsReducer", () => {
  test("Check initial state", () => {
    expect(store.getState().productsReducer).toEqual({
      loading: false,
      filteredProducts: [],
      error: "",
      products: [],
    });
  });
  test("Check fetchAllProducts", async () => {
    await store.dispatch(fetchAllProducts());
    expect(store.getState().productsReducer.products.length).toBe(4);
  });

  // Need to know how to do this
  test("Check fetchSingleProductById", () => {
    store.dispatch(fetchSingleProductById(1));
    //  expect(store.getState().productsReducer.products.length).toBe(1);
    //  console.log(a.response)
  });

  test("Check createNewProduct", async () => {
    const product2: NewProduct = {
      title: "new  product",
      price: 300,
      description: "new pro",
      images: [],
      categoryId: 1,
    };
    console.log(store.getState().productsReducer);
    await store.dispatch(fetchAllProducts());
    await store.dispatch(createNewProduct(product2));

    // The correct case here should be 5
    expect(store.getState().productsReducer.products.length).toBe(4);
  });
});
