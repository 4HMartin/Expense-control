import { useMemo } from "react"
import { useBudget } from "../hooks/useBudget"
import ExpenseDetail from "./ExpenseDetail"

export default function ExpenseList() {

    const { state } = useBudget()
    
    /** If there a category selected, filter the state by the category */
    const filteredExpenses = state.currentCategory ? state.expenses.filter(expense => expense.category === state.currentCategory) : state.expenses;
    
    const isEmpty = useMemo(() => filteredExpenses.length === 0, [filteredExpenses])

    return (
        <div className="mt-10 bg-white shadow-lg rounded-lg p-5">
            {isEmpty ? <p className="text-gray-600 text-2xl font-bold">No expenses yet...</p> : (
                <>
                    <p className="text-gray-600 text-2xl font-bold my-5">Expenses List</p>
                    {filteredExpenses.map( expense => (
                        <ExpenseDetail
                            key={expense.id}
                            expense={expense}
                        />
                    ))}
                </>
            )}
        </div>
    )
}