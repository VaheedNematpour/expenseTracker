import { FaChevronDown } from "react-icons/fa";

interface Categories {
  id: number;
  title: string;
}

interface Props {
  categories: Categories[];
  onSelectCategory: (category: string) => void;
}

function ExpenseFilter({ categories, onSelectCategory }: Props) {
  return (
    <>
      <h2>Expense Filter</h2>

      <div>
        <div className="flex items-center space-x-6">
          <p>All Categories</p>

          <button>
            <FaChevronDown />
          </button>
        </div>

        <ul>
          <li onClick={() => onSelectCategory("")}></li>
          {categories.map((category) => (
            <li
              key={category.id}
              onClick={() => onSelectCategory(category.title)}
            >
              {category.title}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default ExpenseFilter;
