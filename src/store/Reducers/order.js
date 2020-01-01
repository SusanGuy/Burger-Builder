import * as actionTypes from "../Actions/actionTypes";
const initialState = {
  orders: [],
  loading: false,
  purchased: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return {
        ...state,
        purchased: false
      };

    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return {
        ...state,
        orders: state.orders.concat({
          ...action.orderData,
          id: action.orderId
        }),
        loading: false,
        purchased: true
      };
    case actionTypes.PURCHASE_BURGER_FAIL:
      return {
        ...state,
        loading: false
      };

    case actionTypes.FETCH_ORDERS_INIT:
      return {
        ...state,
        loading: true
      };
    case actionTypes.FETCH_ORDERS:
      console.log(action.orders);
      return {
        ...state,
        orders: action.orders,
        loading: false
      };
    case actionTypes.FETCH_ORDERS_FAILED:
      return {
        ...state,
        loading: false
      };

    default:
      return state;
  }
};

export default reducer;
