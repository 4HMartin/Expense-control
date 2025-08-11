import { useMemo } from "react"
import { categories } from "../data/categories"
import { formatDate } from "../helpers"
import type { Expense } from "../types"
import AmountDisplay from "./AmountDisplay"

type ExpenseDetailProps = {
    expense: Expense
}

export default function ExpenseDetail({ expense }: ExpenseDetailProps){

    const categoryInfo = useMemo(() => categories.filter(cat => cat.id === expense.category)[0], [expense])

    return (
        <div className="bg-white shadow-lg p-10 w-full border-b border-gray-200 flex gap-6 items-center">
            <div>
                <img
                    src={`/icon_${categoryInfo.icon}.svg`}
                    alt="expense icon"
                    className="w-30"
                />
            </div>

            <div className="flex-1 space-y-2">
                <p className="text-sm font-bold uppercase text-slate-500">{categoryInfo.name}</p>
                <p>{expense.expenseName}</p>
                <p className="text-slate-600 text-sm">{ formatDate(expense.date!.toString()) }</p>
            </div>

            <AmountDisplay
                amount={expense.amount}
            />
        </div>
    )
}