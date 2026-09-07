import { EDIT_ORDER } from "../actions/cart";
import { cartReducer } from "./cart";

const changeQuantity = (action, price) => ({
  type: EDIT_ORDER,
  action,
  idMeal: "meal-1",
  price,
  title: "Pasta",
  img: "pasta.png",
});

describe("cart price handling", () => {
  it("uses the stored item price when a carted meal is edited", () => {
    const added = cartReducer(undefined, changeQuantity("+", 200));
    const incremented = cartReducer(added, changeQuantity("+", 999));
    const decremented = cartReducer(incremented, changeQuantity("-", 123));

    expect(added.orderItems[0]).toMatchObject({ qty: 1, price: 200, total: 200 });
    expect(incremented.orderItems[0]).toMatchObject({ qty: 2, price: 200, total: 400 });
    expect(decremented.orderItems[0]).toMatchObject({ qty: 1, price: 200, total: 200 });
    expect(added.orderItems[0].total).toBe(200);
  });
});
