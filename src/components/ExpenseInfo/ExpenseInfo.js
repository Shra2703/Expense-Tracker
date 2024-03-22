import React, { useState } from "react";
import styles from "./ExpenseInfo.module.css";

export default function ExpenseInfo(props) {
  let { expenses } = props;
  let profitAmount = 0;
  let lossAmount = 0;

  // calculating the amount profit, loss and grandtotal
  let grandTotal = expenses.reduce((acc, currentExpense) => {
    let amount = Number(currentExpense.amount);
    if (amount < 0) lossAmount += amount;
    else profitAmount += amount;

    return acc + amount;
  }, 0);

  return (
    <div className={styles.expenseInfoContainer}>
      <div className={styles.balance}>
        <h4>YOUR BALANCE</h4>
        {/* <h1>$Grand total should be displayed here</h1> */}
        <h1>${grandTotal}</h1>
      </div>
      <div className={styles.incomeExpenseContainer}>
        <div>
          <h4>Income</h4>
          <p id="money-plus" className={`${styles.money} ${styles.plus}`}>
            +${profitAmount}
          </p>
        </div>
        <div>
          <h4>Expense</h4>
          <p id="money-minus" className={`${styles.money} ${styles.minus}`}>
            -${lossAmount}
          </p>
        </div>
      </div>
    </div>
  );
}
