import { useState } from "react";
import ExpenseList from "./components/ExpenseTracker/ExpenseList";
import ExpenseFilter from "./components/ExpenseTracker/ExpenseFilter";

const App = () => {
  const [expenses, setExpenses] = useState([
    { id: 1, title: "product 1", category: "Grocerries", amount: 24 },
    { id: 2, title: "product 2", category: "Utilities", amount: 35 },
    { id: 3, title: "product 3", category: "Grocerries", amount: 18 },
  ]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const newExpense = selectedCategory
    ? expenses.filter((e) => e.category === selectedCategory)
    : expenses;

  return (
    <>
      <main className="max-w-5xl mx-auto py-8">
        <ExpenseFilter
          onSelectCategory={(category) => setSelectedCategory(category)}
        />

        <ExpenseList
          expenses={newExpense}
          onDleteExpense={(id) =>
            setExpenses(expenses.filter((expense) => expense.id !== id))
          }
        />
      </main>
    </>
  );
};

export default App;
