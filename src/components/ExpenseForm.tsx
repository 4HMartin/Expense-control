import { useEffect, useState } from "react";
import type { DraftExpense, Value } from "../types";
import { categories } from "../data/categories";
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";

export default function ExpenseForm() {
    
    const [expense, setExpense] = useState<DraftExpense>({
        amount: 0,
        expenseName: '',
        category: '',
        date: new Date()
    });

    const [error, setError] = useState('');
    const [previousAmount, setPreviousAmount] = useState(0);
    const { dispatch, state, remainingBudget } = useBudget();


    useEffect(() => {
        if(state.editingID){
            const editingExpense = state.expenses.filter( currentExpense => currentExpense.id === state.editingID)[0];
            setExpense(editingExpense);
            setPreviousAmount(editingExpense.amount)
        }
    },[state.editingID]);

    // Function to handle changes in the input fields
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const isAmountField = ['amount'].includes(name);
        
        setExpense({
            ...expense,
            [name]: isAmountField ? Number(value) : value
        })
    }

    // Function to handle date changes based on the 'Value' type provided by the DatePicker
    const handleChangeDate = (value: Value) => {
        setExpense({
            ...expense,
            date: value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();

        // Validation
        // Transform the object (state) to an array like, if there are any empty strings return error
        if(Object.values(expense).includes('')){
            setError('All the fields are mandatory');
            return
        }

        // Validate no budget limit reached
        if((expense.amount - previousAmount) > remainingBudget){
            setError('Budget limit reached!');
            return 
        }

        // Add new expense or edit vía dispatch
        if(state.editingID){
            dispatch({ type: 'update-expense', payload: {expense: { id: state.editingID, ...expense }} })
        } else {
            dispatch({ type: 'add-expense', payload: { expense } })
        }

        // Restart the state
        setExpense({
            amount: 0,
            expenseName: '',
            category: '',
            date: new Date()
        })
        setPreviousAmount(0)
    }

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
                {state.editingID ? 'Save changes' : 'New expense'}
            </legend>

            {error && <ErrorMessage>{error}</ErrorMessage>}

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
                    value={expense.expenseName}
                    onChange={handleChange}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="amount" className="text-xl">
                    Amount:
                </label>
                <input
                    type="number"
                    name="amount"
                    id="amount"
                    placeholder="e.g., 50"
                    min="0"
                    step="0.01"
                    className="bg-slate-100 p-2"
                    value={expense.amount}
                    onChange={handleChange}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="Category" className="text-xl">
                    Category:
                </label>
                <select
                    name="category"
                    id="category"
                    className="bg-slate-100 p-2"
                    value={expense.category}
                    onChange={handleChange}
                >
                    <option value="">-- Select a category --</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id} className="text-black">
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="date" className="text-xl">
                    Date:
                </label>
                <DatePicker
                    name="expenseDate"
                    id="expenseDate"
                    className="bg-slate-100 p-2"
                    onChange={handleChangeDate}
                    value={expense.date}
                />
            </div>

            <input
                type="submit"
                className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
                value={state.editingID ? 'Save changes' : 'Add expense'}
            />
        </form>
    )
}