import cartReducer, {
  addItemToCart,
  removeItemFromCart,
  setItemQuantity,
  increaseItemQuantity,
  decreaseItemQuantity,
  manageSideCartVisible,
  checkoutCart,
} from "../../redux/reducers/cartReducer";
import { CartType } from "../../types/Cart";
import store from "../shared/store";

describe("cartReducer", () => {
  const initialState: CartType = {
    items: [],
    totalAmount: 0,
    totalQuantity: 0,
    isSideCartVisible: false,
    shippingFee: 0,
    cartId: "",
  };

  test("Check initial state", () => {
    expect(store.getState().productsReducer).toEqual({
      loading: false,
      filteredProducts: [],
      error: "",
      products: [],
    });
  });

  // Add more test cases as needed for other actions and scenarios
});
