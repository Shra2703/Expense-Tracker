import React, { useEffect, useRef } from "react";
import styles from "./ExpenseForm.module.css";

export default function ExpenseForm({ addExpense, expenseToUpdate, updateExpense, resetExpenseUpdate }) {
  // Create state or ref for the inputs here
  // const  = props;
  const expenseTextInput = useRef();
  const expenseAmountInput = useRef();

  useEffect(() => {
    if (!expenseToUpdate) return;
    expenseTextInput.current.value = expenseToUpdate.text;
    expenseAmountInput.current.value = expenseToUpdate.amount;
  }, [expenseToUpdate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let textValue = expenseTextInput.current.value;
    let amountValue = expenseAmountInput.current.value;

    if (Number(amountValue) == 0) return;

    if (!expenseToUpdate) {
      const expense = {
        text: textValue,
        amount: Number(amountValue),
        id: new Date().getTime(),
      };

      addExpense(expense);
      clearInputs();
      return;
    }

    const expense = {
      text: textValue,
      amount: Number(amountValue),
      id: expenseToUpdate.id,
    };

    const result = updateExpense(expense);
    if(!result) return;
    clearInputs();
    resetExpenseUpdate();
  };

  const clearInputs = () => {
    expenseTextInput.current.value = "";
    expenseAmountInput.current.value = "";
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3>Add new transaction</h3>
      <label htmlFor="expenseText">Text</label>
      <input
        id="expenseText"
        className={styles.input}
        type="text"
        placeholder="Enter text..."
        ref={expenseTextInput}
        required
      />
      <div>
        <label htmlFor="expenseAmount">Amount</label>
        <div>(negative - expense,positive-income)</div>
      </div>
      <input
        className={styles.input}
        id="expenseAmount"
        type="number"
        placeholder="Enter amount..."
        ref={expenseAmountInput}
        required
      />
      <button className={styles.submitBtn}>Add Transaction</button>
    </form>
  );
}
