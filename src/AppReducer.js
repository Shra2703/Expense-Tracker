import "./App.css";
import React, { useReducer } from "react";
import ExpenseForm from "./components/ExpenseForm/ExpenseForm";
import ExpenseInfo from "./components/ExpenseInfo/ExpenseInfo";
import ExpenseList from "./components/ExpenseList/ExpenseList";

const reducerFunc = (state, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return [action.payload, ...state];
    case "DELETE_EXPENSE":
      return state.filter((expense, index) => expense.id !== action.index);
    
  }
};

export default function AppReducer() {
  const [state, dispatch] = useReducer(reducerFunc, []);

  const addExpense = (expense) => {
    let {text, amount, id} = expense
    console.log(state);
    dispatch({ type: "ADD_EXPENSE", payload: { text, amount, id } });
  };

  const deleteExpense = (index) => {
    dispatch({ type: "DELETE_EXPENSE", index });
  };

  return (
    <>
      <h2 className="mainHeading">Expense Tracker</h2>
      <div className="App">
        <ExpenseForm addExpense={addExpense} />
        <div className="expenseContainer">
          <ExpenseInfo expenses={state} />
          <ExpenseList expenses={state} deleteExpense={deleteExpense} />
        </div>
      </div>
    </>
  );
}
