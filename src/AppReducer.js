import "./App.css";
import React, { useReducer, useState } from "react";
import ExpenseForm from "./components/ExpenseForm/ExpenseForm";
import ExpenseInfo from "./components/ExpenseInfo/ExpenseInfo";
import ExpenseList from "./components/ExpenseList/ExpenseList";

const reducerFunc = (state, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return [action.payload, ...state];
    case "DELETE_EXPENSE":
      return state.filter((expense, index) => expense.id !== action.index);
    case "UPDATE_EXPENSE":{
      const expenseDuplicate  = state;
      expenseDuplicate[action.payload.expensePos] = action.payload.expense;

      return [...expenseDuplicate]
      
    }
      
  }
};

export default function AppReducer() {
  const [state, dispatch] = useReducer(reducerFunc, []);
  const [expenseToUpdate, setExpenseToUpdate] = useState(null);

  // adding the expense
  const addExpense = (expense) => {
    let { text, amount, id } = expense;
    console.log(state);
    dispatch({ type: "ADD_EXPENSE", payload: { text, amount, id } });
  };

  // deleting the expense
  const deleteExpense = (index) => {
    dispatch({ type: "DELETE_EXPENSE", index });
  };

  const updateExpense = (expense) => {
      const expensePos = state.findIndex((e) =>  expense.id === e.id)

      if(expensePos === -1) return false

      dispatch({type: "UPDATE_EXPENSE", payload: {
        expensePos, expense
      }})

      return true;
  }

  const resetExpenseUpdate = () => {
    setExpenseToUpdate(null)
  }

  return (
    <>
      <h2 className="mainHeading">Expense Tracker</h2>
      <div className="App">
        <ExpenseForm
          addExpense={addExpense}
          expenseToUpdate={expenseToUpdate}
          updateExpense={updateExpense}
          resetExpenseUpdate = {resetExpenseUpdate}
        />
        <div className="expenseContainer">
          <ExpenseInfo expenses={state} />
          <ExpenseList
            expenses={state}
            deleteExpense={deleteExpense}
            changeExpense={setExpenseToUpdate}
          />
        </div>
      </div>
    </>
  );
}
