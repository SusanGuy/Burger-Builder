import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Aux from "../../../hoc/Aux/Aux";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: ""
    },
    loading: false
  };

  orderHandler = async e => {
    e.preventDefault();
    this.setState({
      loading: true
    });
    try {
      const order = {
        ingredients: this.props.ingredients,
        price: this.props.price,
        customer: this.state
      };

      await axios.post("/orders.json", order);
      await this.setState({
        loading: false
      });
      this.props.history.push("/");
    } catch (err) {
      this.setState({
        loading: false
      });
    }
  };

  render() {
    let contactForm = this.state.loading ? (
      <Spinner />
    ) : (
      <Aux>
        <h4>Enter your Contact Data</h4>
        <form>
          <input
            className={classes.Input}
            type="text"
            name="name"
            placeholder="Your Name"
          />
          <input
            className={classes.Input}
            type="email"
            name="email"
            placeholder="Your Email"
          />
          <input
            className={classes.Input}
            type="text"
            name="street"
            placeholder="Street Address"
          />
          <input
            className={classes.Input}
            type="number"
            name="zip"
            placeholder="ZipCode"
          />
          <Button btnType="Success" clicked={this.orderHandler}>
            ORDER
          </Button>
        </form>
      </Aux>
    );
    return <div className={classes.ContactData}>{contactForm}</div>;
  }
}

export default ContactData;
