import { useState } from "react";
import ExpenseList from "./components/ExpenseTracker/ExpenseList";

const App = () => {
  const [expenses, setExpenses] = useState([
    { id: 1, title: "product 1", category: "category a", amount: 24 },
    { id: 2, title: "product 2", category: "category b", amount: 35 },
    { id: 3, title: "product 3", category: "category a", amount: 18 },
  ]);

  return (
    <>
      <main className="max-w-5xl mx-auto py-8">
        <ExpenseList
          expenses={expenses}
          onDleteExpense={(id) =>
            setExpenses(expenses.filter((expense) => expense.id !== id))
          }
        />
      </main>
    </>
  );
};

export default App;
