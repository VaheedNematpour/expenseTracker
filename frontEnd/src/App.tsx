import { useEffect, useState } from "react";
import ExpenseList from "./components/ExpenseTracker/ExpenseList";
import axios, { CanceledError } from "axios";
import Expenses from "./components/Expenses";
import ExpenseFilter from "./components/ExpenseTracker/ExpenseFilter";
import ExpenseForm from "./components/ExpenseTracker/ExpenseForm";

const App = () => {
  const [expenses, setExpenses] = useState<Expenses[]>([]);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    axios
      .get<Expenses[]>("http://localhost:3000/Expenses", {
        signal: controller.signal,
      })
      .then((res) => setExpenses(res.data))
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });

    return () => controller.abort();
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:3000/Categories")
      .then((res) => setCategories(res.data))
      .catch((err) => setError(err.message));
  }, []);
  const newExpanses = selectedCategory
    ? expenses.filter((e) => e.category === selectedCategory)
    : expenses;

  return (
    <>
      <main className="max-w-5xl mx-auto">
        {error && <p className="text-xl text-red-800">{error}</p>}
        <ExpenseForm
          onAddExpense={(expense) =>
            setExpenses([...expenses, { ...expense, id: expenses.length + 1 }])
          }
        />

        <ExpenseFilter
          categories={categories}
          onSelectCategory={(category) => setSelectedCategory(category)}
        />

        <ExpenseList
          expenses={newExpanses}
          onDeleteExpense={(id) =>
            setExpenses(expenses.filter((expense) => expense.id !== id))
          }
        />
      </main>
    </>
  );
};

export default App;

// import { useState } from "react";
// import ExpenseList from "./components/ExpenseTracker/ExpenseList";
// import ExpenseFilter from "./components/ExpenseTracker/ExpenseFilter";
// import ExpenseForm from "./components/ExpenseTracker/ExpenseForm";

// const App = () => {
//   const [expenses, setExpenses] = useState([
//     { id: 1, title: "product 1", category: "Grocerries", amount: 24 },
//     { id: 2, title: "product 2", category: "Utilities", amount: 35 },
//     { id: 3, title: "product 3", category: "Grocerries", amount: 18 },
//   ]);
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const newExpense = selectedCategory
//     ? expenses.filter((e) => e.category === selectedCategory)
//     : expenses;

//   return (
//     <>
//       <main className="max-w-5xl mx-auto py-8">
//         <ExpenseForm
//           onAddExpense={(expense) =>
//             setExpenses([...expenses, { ...expense, id: expenses.length + 1 }])
//           }
//         />

//         <ExpenseFilter
//           onSelectCategory={(category) => setSelectedCategory(category)}
//         />

//         <ExpenseList
//           expenses={newExpense}
//           onDleteExpense={(id) =>
//             setExpenses(expenses.filter((expense) => expense.id !== id))
//           }
//         />
//       </main>
//     </>
//   );
// };

// export default App;
