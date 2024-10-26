import Expenses from "../Expenses";

interface Props {
  expenses: Expenses[];
  onDeleteExpense: (id: number) => void;
}

const ExpenseList = ({ expenses, onDeleteExpense }: Props) => {
  return (
    <>
      <h2 className="text-3xl text-gray-800 font-bold my-4">Expense List</h2>

      <table className="w-full text-left">
        <thead>
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-xl text-gray-600 font-bold"
            >
              Title
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-xl text-gray-600 font-bold"
            >
              Category
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-xl text-gray-600 font-bold"
            >
              Amount
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-xl text-gray-600 font-bold"
            ></th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td
                scope="row"
                className="px-6 py-4 text-xl text-gray-600 font-medium"
              >
                {expense.title}
              </td>
              <td scope="row" className="px-6 py-4 text-xl text-gray-600">
                {expense.category}
              </td>
              <td scope="row" className="px-6 py-4 text-xl text-gray-600">
                {expense.amount}
              </td>
              <td scope="row" className="px-6 py-4">
                <button
                  onClick={() => onDeleteExpense(expense.id)}
                  className="border-2 border-red-800 p-1 rounded text-xl text-red-800 hover:bg-red-800 hover:text-red-100"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th
              colSpan={2}
              className="px-6 py-3 text-xl text-gray-600 font-bold"
            >
              Total
            </th>
            <th colSpan={2} className="px-6 py-3 text-xl text-gray-600">
              ${expenses.reduce((ac, expense) => ac + expense.amount, 0)}
            </th>
          </tr>
        </tfoot>
      </table>
    </>
  );
};

export default ExpenseList;
