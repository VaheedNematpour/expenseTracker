import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const categories = ["Entertainment", "Groceries", "Utilities"] as const;

const schema = z.object({
  title: z
    .string({ message: "The Title field is required!" })
    .min(3, { message: "The Title field should at least has 3 characters!" }),
  category: z.enum(categories, {
    errorMap: () => ({ message: "The Category field is required!" }),
  }),
  amount: z
    .number({ invalid_type_error: "The Amount field is required!" })
    .min(0.01)
    .max(100_000),
});

type FormData = z.infer<typeof schema>;

interface Props {
  onAddExpense: (expense: FormData) => void;
}

function ExpenseForm({ onAddExpense }: Props) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  return (
    <>
      <h2 className="text-3xl text-gray-800 font-bold my-4">Expense Form</h2>

      <form
        onSubmit={handleSubmit((data) => {
          onAddExpense(data);
          reset();
        })}
      >
        <div className="space-y-2 my-2">
          <label htmlFor="title" className="text-xl text-gray-600 font-medium">
            Title
          </label>
          <input
            {...register("title")}
            type="text"
            placeholder="Title"
            className="text-xl text-gray-600 block w-full bg-gray-200 px-6 py-2 rounded"
          />
          {errors.title && (
            <p className="text-xl text-red-800">{errors.title.message}</p>
          )}
        </div>

        <div className="space-y-2 my-2">
          <label
            htmlFor="categories"
            className="text-xl text-gray-600 font-medium"
          >
            Categories
          </label>
          <select
            id="categories"
            {...register("category")}
            className="text-xl text-gray-600 block w-full bg-gray-200 px-6 py-2 rounded"
          >
            <option value=""></option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-xl text-red-800">{errors.category.message}</p>
          )}
        </div>

        <div className="space-y-2 my-2">
          <label htmlFor="amount" className="text-xl text-gray-600 font-medium">
            Amount
          </label>
          <input
            {...register("amount", { valueAsNumber: true })}
            type="number"
            id="amount"
            placeholder="Amount"
            className="text-xl text-gray-600 block w-full bg-gray-200 px-6 py-2 rounded"
          />
          {errors.amount && (
            <p className="text-xl text-red-800">{errors.amount.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full border-2 border-gray-800 py-2 text-xl text-gray-800 rounded hover:bg-gray-200"
        >
          Add
        </button>
      </form>
    </>
  );
}

export default ExpenseForm;
