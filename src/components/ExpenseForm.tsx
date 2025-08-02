import { categories } from "../data/categories";


export default function ExpenseModal() {


    return (
        <form className="space-y-5">
            <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
                New Expense
            </legend>

            <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-xl">
                    Name of Expense:
                </label>
                <input
                    type="text"
                    name="expenseName"
                    id="expenseName"
                    placeholder="e.g., Groceries"
                    className="bg-slate-100 p-2"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="amount" className="text-xl">
                    Amount:
                </label>
                <input
                    type="number"
                    name="expenseAmount"
                    id="expenseAmount"
                    placeholder="e.g., 50"
                    min="0"
                    step="0.01"
                    className="bg-slate-100 p-2"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="Category" className="text-xl">
                    Category:
                </label>
                <select
                    name="expenseCategory"
                    id="expenseCategory"
                    className="bg-slate-100 p-2"
                >
                    <option value="">-- Select a category --</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.name} className="text-black">
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
        </form>
    )
}