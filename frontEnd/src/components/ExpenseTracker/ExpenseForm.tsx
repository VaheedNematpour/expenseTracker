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
          <label htmlFor="category">Category</label>
          <select id="category" {...register("category")}>
            <option value=""></option>
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
          {errors.category && <p>{errors.category.message}</p>}
        </div>
        <div>
          <label htmlFor="amount">Amount</label>
          <input
            {...register("amount", { valueAsNumber: true })}
            type="number"
            placeholder="Amount"
          />
          {errors.amount && <p>{errors.amount.message}</p>}
        </div>

        <button disabled={!isValid}>Add</button>
      </form>
    </>
  );
}

export default ExpenseForm;
