import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Aux from "../../../hoc/Aux/Aux";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: "",
        validation: {
          required: true,
          minLength: 7
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email"
        },
        value: "",
        validation: {
          required: true,
          mustContain: "@"
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street"
        },
        value: "",
        validation: {
          required: true,
          minLength: 7
        },
        valid: false,
        touched: false
      },
      city: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "City"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipcode: {
        elementType: "input",
        elementConfig: {
          type: "number",
          placeholder: "Zipcode"
        },
        value: "",
        validation: {
          required: true,
          exactLength: 5
        },
        valid: false,
        touched: false
      },

      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            {
              value: "fastest",
              displayValue: "Fastest"
            },
            {
              value: "cheapest",
              displayValue: "Cheapest"
            }
          ]
        },
        value: "fastest",
        valid: true
      }
    },
    formIsValid: false,
    loading: false
  };

  checkValidity(value, rules) {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.trim().length >= rules.minLength && isValid;
    }

    if (rules.exactLength) {
      isValid = value.trim().length === rules.exactLength && isValid;
    }

    if (rules.mustContain) {
      isValid = value.trim().includes(rules.mustContain) && isValid;
    }

    return isValid;
  }

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
      this.props.history.push("/orders");
    } catch (err) {
      this.setState({
        loading: false
      });
    }
  };

  inputChangeHandler = (e, iI) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    };
    const updatedFormElement = { ...updatedOrderForm[iI] };
    updatedFormElement.value = e.target.value;

    if (updatedFormElement.validation) {
      updatedFormElement.valid = this.checkValidity(
        updatedFormElement.value,
        updatedFormElement.validation
      );
    }
    updatedFormElement.touched = true;

    updatedOrderForm[iI] = updatedFormElement;

    let formIsValid = true;
    for (let iI in updatedOrderForm) {
      formIsValid = updatedOrderForm[iI].valid && formIsValid;
    }

    this.setState({
      orderForm: updatedOrderForm,
      formIsValid
    });
  };

  render() {
    let inputlist = Object.keys(this.state.orderForm).map(input => {
      return {
        id: input,
        config: this.state.orderForm[input]
      };
    });
    let contactForm = this.state.loading ? (
      <Spinner />
    ) : (
      <Aux>
        <h4>Enter your Contact Data</h4>
        <form onSubmit={this.orderHandler}>
          {inputlist.map(formElement => {
            return (
              <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                changed={e => this.inputChangeHandler(e, formElement.id)}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation ? true : false}
                touched={formElement.config.touched}
              />
            );
          })}
          <Button btnType="Success" disabled={!this.state.formIsValid}>
            ORDER
          </Button>
        </form>
      </Aux>
    );
    return <div className={classes.ContactData}>{contactForm}</div>;
  }
}

export default ContactData;
