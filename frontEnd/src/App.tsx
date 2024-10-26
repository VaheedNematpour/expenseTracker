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

  const handleDeleteExpense = (id: number) => {
    const originalExpenses = [...expenses];
    setExpenses(expenses.filter((expense) => expense.id !== id));
    axios.delete("http://localhost:3000/Categories/" + id).catch((err) => {
      setError(err.message);
      setExpenses(originalExpenses);
    });
  };

  const handleAddExpense = (expense: Expenses) => {
    const originalExpense = [...expenses];
    setExpenses([...expenses, { ...expense, id: expenses.length + 1 }]);
    axios
      .post("http://localhost:3000/Categories", expense)
      .then(({ data }) => setExpenses([...expenses, data]))
      .catch((err) => {
        setError(err.message);
        setExpenses(originalExpense);
      });
  };

  return (
    <>
      <main className="max-w-5xl mx-auto py-8">
        {error && <p className="text-xl text-red-800">{error}</p>}

        <ExpenseForm onAddExpense={(expense) => handleAddExpense(expense)} />

        <ExpenseFilter
          categories={categories}
          onSelectCategory={(category) => setSelectedCategory(category)}
        />

        <ExpenseList
          expenses={newExpanses}
          onDeleteExpense={(id) => handleDeleteExpense(id)}
        />
      </main>
    </>
  );
};

export default App;
