import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";
export const addIngredient = ingredientName => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName
  };
};

export const removeIngredient = ingredientName => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName
  };
};

const setIngredients = ingredients => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients
  };
};

const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  };
};

export const initIngredients = () => {
  return async dispatch => {
    try {
      const ingredients = await axios.get("/ingredients.json");
      dispatch(setIngredients(ingredients.data));
    } catch (err) {
      console.log(err);
      dispatch(fetchIngredientsFailed());
    }
  };
};
