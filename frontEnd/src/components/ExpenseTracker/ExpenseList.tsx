interface Expenses {
  id: number;
  title: string;
  category: string;
  amount: number;
}

interface Props {
  expenses: Expenses[];
  onDleteExpense: (id: number) => void;
}

const ExpenseList = ({ expenses, onDleteExpense }: Props) => {
  return (
    <>
      <h2>Expense List</h2>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.title}</td>
              <td>{expense.category}</td>
              <td>{expense.amount}</td>
              <td>
                <button onClick={() => onDleteExpense(expense.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th>Total</th>
            <th>
              {expenses
                .reduce((ac, expense) => ac + expense.amount, 0)
                .toFixed(2)}
            </th>
          </tr>
        </tfoot>
      </table>
    </>
  );
};

export default ExpenseList;
