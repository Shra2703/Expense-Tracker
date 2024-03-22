import "./App.css";
import React, { useState } from "react";
import ExpenseForm from "./components/ExpenseForm/ExpenseForm";
import ExpenseInfo from "./components/ExpenseInfo/ExpenseInfo";
import ExpenseList from "./components/ExpenseList/ExpenseList";

export default function App() {
  const [expenses, setExpenses] = useState([]);

  const addExpense = (expense) => {
    setExpenses((prev) => [expense, ...prev]);
    console.log(expenses);
  };

  const deleteExpense = (index) => {
    setExpenses((prev) => {
      return prev.filter((expense) => expense.id != index);
    });
  };

  const updateExpense = (index) => {
    
  }
  return (
    <>
      <h2 className="mainHeading">Expense Tracker</h2>
      <div className="App">
        <ExpenseForm addExpense={addExpense} />
        <div className="expenseContainer">
          <ExpenseInfo expenses={expenses} />
          <ExpenseList expenses={expenses} deleteExpense={deleteExpense} />
        </div>
      </div>
    </>
  );
}
