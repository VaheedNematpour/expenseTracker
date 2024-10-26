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
      <h2>Expense Form</h2>

      <form
        onSubmit={handleSubmit((data) => {
          onAddExpense(data);
          reset();
        })}
      >
        <div>
          <label htmlFor="title">Title</label>
          <input {...register("title")} type="text" placeholder="Title" />
          {errors.title && <p>{errors.title.message}</p>}
        </div>

        <div>
          <label htmlFor="categories">Categories</label>
          <select id="categories" {...register("category")}>
            <option value=""></option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && <p>{errors.category.message}</p>}
        </div>

        <div>
          <label htmlFor="amount">Amount</label>
          <input
            {...register("amount", { valueAsNumber: true })}
            type="number"
            id="amount"
            placeholder="Amount"
          />
          {errors.amount && <p>{errors.amount.message}</p>}
        </div>

        <button>Add</button>
      </form>
    </>
  );
}

export default ExpenseForm;
