import React, { Component } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "../Checkout/Contact-Data/ContactData.module.css";
import * as actions from "../../store/Actions/index";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Redirect } from "react-router-dom";
class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email Address"
        },
        value: "",
        validation: {
          required: true,
          mustContain: "@"
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password"
        },
        value: "",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    formIsValid: false,
    isSignup: true
  };

  componentDidMount() {
    if (!this.props.building && this.props.authRedirectPath !== "/orders") {
      this.props.onRedirect();
    }
  }

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

  inputChangeHandler = (e, iI) => {
    const updatedOrderForm = {
      ...this.state.controls
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
      controls: updatedOrderForm,
      formIsValid
    });
  };

  formSubmitHandler = e => {
    e.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
  };

  switchAuthModeHandler = () => {
    this.props.onInit();
    this.setState(prevState => {
      return {
        isSignup: !prevState.isSignup
      };
    });
  };

  render() {
    let inputList = Object.keys(this.state.controls).map(input => {
      return {
        id: input,
        config: this.state.controls[input]
      };
    });

    const form = inputList.map(formElement => {
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
    });
    let error;

    if (this.props.errorMsg) {
      error = (
        <p
          id="error"
          style={{
            color: "red",
            fontWeight: 600
          }}
        >
          {this.props.errorMsg}!
        </p>
      );
    }

    if (this.props.loading) {
      return <Spinner />;
    }

    let authRedirect = null;

    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }

    return (
      <div className={classes.ContactData}>
        {authRedirect}
        <h1> {this.state.isSignup ? "Sign-Up Form" : "Sign-In Form"}</h1>
        <form onSubmit={this.formSubmitHandler}>
          {form}
          <Button btnType="Success" disabled={!this.state.formIsValid}>
            Submit
          </Button>
        </form>
        <Button clicked={this.switchAuthModeHandler} btnType="Danger">
          {this.state.isSignup ? "Go To Signin" : "Go To Signup"}
        </Button>
        {error}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    errorMsg: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    building: state.ingredients.building,
    authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
    onInit: () => dispatch(actions.initComponent()),
    onRedirect: () => dispatch(actions.setAuthRedirectPath("/orders"))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
