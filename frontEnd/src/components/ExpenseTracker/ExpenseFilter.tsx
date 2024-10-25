import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import categories from "../ExpenseCategories";

interface Props {
  onSelectCategory: (category: string) => void;
}

const ExpenseFilter = ({ onSelectCategory }: Props) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <h2 className="text-3xl text-gray-800 font-bold my-4">Expense Filter</h2>

      <div>
        <div
          className="flex items-center justify-between"
          onClick={() => setExpanded(!expanded)}
        >
          <p>All Category</p>

          {expanded ? <FaChevronUp /> : <FaChevronDown />}
        </div>

        {expanded && (
          <ul>
            <li
              onClick={() => {
                onSelectCategory("");
                setExpanded(false);
              }}
            ></li>
            {categories.map((category) => (
              <li
                key={category}
                onClick={() => {
                  onSelectCategory(category);
                  setExpanded(false);
                }}
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
