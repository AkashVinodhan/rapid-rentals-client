export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item._id !== action.payload._id),
      };
    case "INCREASE_QTY":
      return {
        ...state,
        cart: state.cart.map((item) => {
          return item._id == action.payload._id
            ? { ...item, qty: item.qty + 1 }
            : item;
        }),
      };
    case "DECREASE_QTY":
      return {
        ...state,
        cart: state.cart.map((item) => {
          return item._id == action.payload._id
            ? { ...item, qty: item.qty - 1 }
            : item;
        }),
      };
    case "FETCH_FROM_LOCAL":
      return { ...state, cart: action.payload };
    case "FETCH_FROM_DB":
      return { ...state, products: action.payload };
    default:
      return state;
  }
};
