import { useForm } from "react-hook-form";
import categories from "../ExpenseCategories";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  title: z
    .string({ message: "The Title Field is required!" })
    .min(3, { message: "The Title should at least contain 3 Characters!" }),
  category: z.enum(categories),
  amount: z.number({ message: "The Amount Field is required!" }),
});

type FormData = z.infer<typeof schema>;

interface Props {
  onAddExpense: (expense: FormData) => void;
}

function ExpenseForm({ onAddExpense }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

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
          <label htmlFor="title" className="text-xl text-gray-600 font-bold">
            Title
          </label>
          <input
            {...register("title")}
            type="text"
            placeholder="Title"
            className="block w-full bg-gray-200 px-6 py-2 text-lg text-gray-600 rounded"
          />
          {errors.title && <p>{errors.title.message}</p>}
        </div>

        <div className="space-y-2 my-2">
          <label htmlFor="category" className="text-xl text-gray-600 font-bold">
            Category
          </label>
          <select
            id="category"
            {...register("category")}
            className="block w-full border-2 border-gray-600 text-lg text-gray-600 rounded px-6 py-2"
          >
            <option value=""></option>
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
          {errors.category && <p>{errors.category.message}</p>}
        </div>

        <div className="space-y-2 my-2">
          <label htmlFor="amount" className="text-xl text-gray-600 font-bold">
            Amount
          </label>
          <input
            {...register("amount", { valueAsNumber: true })}
            type="number"
            placeholder="Amount"
            className="block w-full bg-gray-200 px-6 py-2 text-xl text-gray-600 rounded"
          />
          {errors.amount && <p>{errors.amount.message}</p>}
        </div>

        <button
          disabled={!isValid}
          type="submit"
          className="w-full py-2 border-2 border-gray-800 rounded text-xl text-gray-800 hover:bg-gray-800 hover:text-gray-100"
        >
          Add
        </button>
      </form>
    </>
  );
}

export default ExpenseForm;
