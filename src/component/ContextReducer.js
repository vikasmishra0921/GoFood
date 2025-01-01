import React, { createContext, useContext, useReducer } from "react";

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
  console.log("Action:", action);
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          name: action.name,
          id: action.id,
          qty: action.qty,
          size: action.size,
          price: action.price,
          img: action.img,
        },
      ];

    case "REMOVE":
      let newArr = [...state];
      newArr.splice(action.index, 1);
      return newArr;

    case "UPDATE":
      let updatedArr = [...state];
      updatedArr = updatedArr.map((food) => {
        if (food.id === action.id && food.size === action.size) {
          // Update quantity and price for the matched item
          return {
            ...food,
            qty: parseInt(action.qty) + food.qty, // Increment the quantity
            price: food.price + action.price, // Add to the total price
          };
        }
        return food; // Return unmodified items
      });
      return updatedArr;

    case "DROP":
      let emptyArray = [];
      return emptyArray;
    default:
      console.log("Error in Reducer");
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);
  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCart = () => useContext(CartStateContext);

export const useDispatchCart = () => useContext(CartDispatchContext);
