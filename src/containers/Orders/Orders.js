import React, { Component } from "react";
import axios from "../../axios-orders";
import Order from "../../components/Order/Order";
import Spineer from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
class Orders extends Component {
  state = {
    orders: [],
    loading: true
  };
  async componentDidMount() {
    try {
      const orders = await axios.get("/orders.json");
      if (orders) {
        this.setState({
          loading: false
        });
      }

      const fetchedOrders = [];

      for (let key in orders.data) {
        fetchedOrders.push({
          ...orders.data[key],
          id: key
        });
      }

      this.setState({
        orders: fetchedOrders
      });
    } catch (err) {
      this.setState({
        loading: false
      });
    }
  }
  render() {
    const userOrders = this.state.orders.map(order => {
      return (
        <Order
          ingredients={order.ingredients}
          price={order.price}
          key={order.id}
        />
      );
    });
    const mainOrder = this.state.loading ? <Spineer /> : userOrders;
    return <div>{mainOrder}</div>;
  }
}
export default withErrorHandler(Orders, axios);
