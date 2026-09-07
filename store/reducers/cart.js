import { EDIT_ORDER } from "../actions/cart";

const initialState = {
  orderItems: [],
};

export function cartReducer(state = initialState, action) {
  let orderList = [...state.orderItems];
  switch (action.type) {
    case EDIT_ORDER:
      const itemIndex = orderList.findIndex((i) => i.idMeal == action.idMeal);
      const currentItem = itemIndex === -1 ? null : orderList[itemIndex];
      if (action.action == "+") {
        if (currentItem) {
          let newQty = currentItem.qty + 1;
          orderList[itemIndex] = {
            ...currentItem,
            qty: newQty,
            total: newQty * currentItem.price,
          };
        } else {
          const newItem = {
            idMeal: action.idMeal,
            strMeal: action.title,
            qty: 1,
            price: action.price,
            total: action.price,
            strMealThumb: action.img,
          };
          orderList.push(newItem);
        }
      } else {
        if (currentItem) {
          if (currentItem.qty > 1) {
            let newQty = currentItem.qty - 1;
            orderList[itemIndex] = {
              ...currentItem,
              qty: newQty,
              total: newQty * currentItem.price,
            };
          } else {
            orderList.splice(itemIndex, 1);
          }
        }
      }
      return {
        ...state,
        orderItems: orderList,
      };
    default:
      return state;
  }
}
