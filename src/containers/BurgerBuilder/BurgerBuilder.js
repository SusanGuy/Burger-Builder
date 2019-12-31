import React, { Component } from "react";
import { connect } from "react-redux";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actionTypes from "../../store/Actions/index";

class BurgerBuilder extends Component {
  state = {
    purchasing: false,

    error: false
  };

  componentDidMount() {
    this.props.onInitializeComponent();
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(item => {
        return ingredients[item];
      })
      .reduce((initial, current) => {
        return initial + current;
      }, 0);

    return sum > 0;
  }

  // addIngredientHandler = type => {
  //   const oldCount = this.state.ingredients[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredient = {
  //     ...this.state.ingredients
  //   };

  //   updatedIngredient[type] = updatedCount;
  //   const priceAddition = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice + priceAddition;
  //   this.setState({
  //     ingredients: updatedIngredient,
  //     totalPrice: newPrice
  //   });
  //   this.updatePurchaseState(updatedIngredient);
  // };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };
  // removeIngridientHandler = type => {
  //   const oldCount = this.state.ingredients[type];
  //   if (oldCount <= 0) {
  //     return;
  //   }
  //   const newCount = oldCount - 1;
  //   const updatedState = {
  //     ...this.state.ingredients
  //   };
  //   updatedState[type] = newCount;
  //   const updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
  //   this.setState({
  //     ingredients: updatedState,
  //     totalPrice: updatedPrice
  //   });
  //   this.updatePurchaseState(updatedState);
  // };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = async () => {
    this.props.history.push({
      pathname: "/checkout"
    });
  };

  render() {
    const disabledInfo = {
      ...this.props.ings
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary;

    let burger = this.props.error ? (
      <p>Ingredients can't be loaded</p>
    ) : (
      <Spinner />
    );
    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            order={this.purchaseHandler}
            totalPrice={this.props.totalPrice}
            ingredientRemoved={this.props.onIngredientDeleted}
            ingredientAdded={this.props.onIngredientAdded}
            disabled={disabledInfo}
            purchasable={this.updatePurchaseState(this.props.ings)}
          ></BuildControls>
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          price={this.props.totalPrice}
          continue={this.purchaseContinueHandler}
          cancel={this.purchaseCancelHandler}
          ingredients={this.props.ings}
        ></OrderSummary>
      );
    }

    return (
      <Aux>
        <Modal
          modalClosed={this.purchaseCancelHandler}
          show={this.state.purchasing}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    totalPrice: state.totalPrice,
    error: state.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingredientName =>
      dispatch(actionTypes.addIngredient(ingredientName)),
    onIngredientDeleted: ingredientName =>
      dispatch(actionTypes.removeIngredient(ingredientName)),
    onInitializeComponent: () => dispatch(actionTypes.initIngredients())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
