import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route, Redirect } from "react-router-dom";
import ContactData from "./Contact-Data/ContactData";
import { connect } from "react-redux";

class Checkout extends Component {
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinueHandler = () => {
    this.props.history.push("/checkout/contact-form");
  };

  render() {
    if (this.props.purchased) {
      return <Redirect to="/orders" />;
    }
    let summary = <Redirect to="/" />;
    if (this.props.ings) {
      summary = (
        <CheckoutSummary
          ingredients={this.props.ings}
          onCheckoutCancelled={this.checkoutCancelledHandler}
          onCheckoutContinue={this.checkoutContinueHandler}
        />
      );
    }
    return (
      <div>
        {summary}
        <Route
          path={this.props.match.path + "/contact-form"}
          component={ContactData}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients.ingredients,
    purchased: state.orders.purchased
  };
};

export default connect(mapStateToProps)(Checkout);
