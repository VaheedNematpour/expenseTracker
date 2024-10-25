import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import categories from "../ExpenseCategories";

interface Props {
  onSelectCategory: (category: string) => void;
}

const ExpenseFilter = ({ onSelectCategory }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const [categoryTitle, setCategoryTitle] = useState("");

  return (
    <>
      <h2 className="text-3xl text-gray-800 font-bold my-4">Expense Filter</h2>

      <div className="border-2 border-gray-800 py-2 rounded">
        <div
          className="flex items-center justify-between"
          onClick={() => setExpanded(!expanded)}
        >
          <p className="px-6 py-2 text-xl text-gray-600 font-medium">
            {categoryTitle ? categoryTitle : "All Categories"}
          </p>

          <button className="px-6 py-2">
            {expanded ? <FaChevronUp size={20} /> : <FaChevronDown size={20} />}
          </button>
        </div>

        {expanded && (
          <ul>
            <li
              onClick={() => {
                onSelectCategory("");
                setCategoryTitle("");
                setExpanded(false);
              }}
              className="px-6 py-4 hover:bg-gray-200"
            ></li>
            {categories.map((category) => (
              <li
                key={category}
                onClick={() => {
                  onSelectCategory(category);
                  setCategoryTitle(category);
                  setExpanded(false);
                }}
                className="px-6 py-2 hover:bg-gray-200"
              >
                {category}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default ExpenseFilter;
