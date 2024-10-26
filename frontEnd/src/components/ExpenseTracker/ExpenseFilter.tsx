import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface Categories {
  id: number;
  title: string;
}

interface Props {
  categories: Categories[];
  onSelectCategory: (category: string) => void;
}

function ExpenseFilter({ categories, onSelectCategory }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [categoryTitle, setCategoryTitle] = useState("All Categories");

  return (
    <>
      <h2 className="text-3xl text-gray-800 font-bold my-4">Expense Filter</h2>

      <div className="border-2 border-gray-800 rounded">
        <div
          className="flex items-center justify-between space-x-6 px-6 py-2"
          onClick={() => setExpanded(!expanded)}
        >
          <p className="text-xl text-gray-600 font-bold">{categoryTitle}</p>

          <button>
            {expanded ? <FaChevronUp size={20} /> : <FaChevronDown size={20} />}
          </button>
        </div>

        {expanded && (
          <ul>
            <li
              onClick={() => {
                onSelectCategory("");
                setCategoryTitle("All Categories");
                setExpanded(false);
              }}
              className="px-6 py-4 hover:bg-gray-200"
            ></li>
            {categories.map((category) => (
              <li
                key={category.id}
                onClick={() => {
                  onSelectCategory(category.title);
                  setCategoryTitle(category.title);
                  setExpanded(false);
                }}
                className="px-6 py-4 text-lg text-gray-600 font-medium hover:bg-gray-200"
              >
                {category.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default ExpenseFilter;
