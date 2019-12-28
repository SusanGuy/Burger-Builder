import React from "react";
import classes from "./Order.module.css";
const order = props => {
  const realOrder = [];
  for (let ingredientsName in props.ingredients) {
    if (props.ingredients[ingredientsName] !== 0) {
      realOrder.push({
        name: ingredientsName,
        amount: props.ingredients[ingredientsName]
      });
    }
  }

  let ingredientOutput = realOrder.map(item => {
    return (
      <span
        key={item.name}
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          margin: "0 8px",
          border: "1px solid #ccc",
          padding: "5px"
        }}
      >
        {item.name} ({item.amount})
      </span>
    );
  });

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientOutput} </p>
      <p>
        Price: <strong>USD {props.price.toFixed(2)}</strong>
      </p>
    </div>
  );
};
export default order;
