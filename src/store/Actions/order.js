import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  };
};

const purchaseBurgerFail = error => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error
  };
};

const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};

export const purchaseBurger = orderData => {
  return async dispatch => {
    dispatch(purchaseBurgerStart());
    try {
      const order = await axios.post("/orders.json", orderData);
      dispatch(purchaseBurgerSuccess(order.data.name, orderData));
    } catch (err) {
      dispatch(purchaseBurgerFail(err.message));
    }
  };
};

const fetchOrders = orders => {
  return {
    type: actionTypes.FETCH_ORDERS,
    orders
  };
};

const fetchOrdersFail = err => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  };
};

const fetchOrdersInit = err => {
  return {
    type: actionTypes.FETCH_ORDERS_INIT,
    err: err
  };
};

export const fetchAllOrders = () => {
  return async dispatch => {
    dispatch(fetchOrdersInit());
    try {
      const orders = await axios.get("/orders.json");
      const fetchedOrders = [];

      for (let key in orders.data) {
        fetchedOrders.push({
          ...orders.data[key],
          id: key
        });
      }

      dispatch(fetchOrders(fetchedOrders));
    } catch (err) {
      dispatch(fetchOrdersFail(err.message));
    }
  };
};
