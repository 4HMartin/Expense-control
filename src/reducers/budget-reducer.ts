import { v4 as uuidv4 } from "uuid";
import type { DraftExpense, Expense } from "../types";

export type BudgetActions = 
    { type: 'add-budget', payload: { budget: number } } |
    { type: 'show-modal' } |
    { type: 'close-modal' } |
    { type: 'add-expense', payload: { expense: DraftExpense }} |
    { type: 'remove-expense', payload: { id: Expense['id'] }} |
    { type: 'get-expense-by-id', payload: { id: Expense['id'] }} |
    { type: 'update-expense', payload: { expense: Expense }}

export type BudgetState = {
    budget: number;
    modal: boolean;
    expenses: Expense[];
    editingID: Expense['id']
}

export const initialState: BudgetState = {
    budget: 0,
    modal: false,
    expenses: [],
    editingID: ''
}

/**
 * @description Transform a tupe DraftExpense to a type Expense adding an ID vía uuid
 * @param DraftExpense
 * @returns Expense object
 */
const createExpense = (draftExpense: DraftExpense): Expense =>{
    return {
        ...draftExpense,
        id: uuidv4()
    }
}

export const budgetReducer = (
    state: BudgetState = initialState,
    action: BudgetActions
    ) => {

    if(action.type === 'add-budget'){

        return {
            ...state,
            budget: action.payload.budget
        }
    }

    if(action.type === 'show-modal'){
        return {
            ...state,
            modal: true
        }
    }

    if(action.type === 'close-modal'){
        return {
            ...state,
            modal: false,
            editingID: ''
        }
    }

    if(action.type === 'add-expense'){
        const expense = createExpense(action.payload.expense)

        return {
            ...state,
            expenses: [...state.expenses, expense],
            modal: false
        }
    }

    if(action.type === 'remove-expense'){
        return {
            ...state,
            expenses: state.expenses.filter( expense => expense.id !== action.payload.id)
        }
    }

    if(action.type === 'get-expense-by-id'){
        return {
            ...state,
            editingID: action.payload.id,
            modal: true
        }
    }

    if(action.type === 'update-expense'){
        return {
            ...state,
            /* Iterar sobre los gastos del state, si el id coincide con el del payload, sobre-escribe el gasto con el gasto que procede del payload en caso contrario retorna el gasto actual para no perderlo en la iteración */
            expenses: state.expenses.map(expense => expense.id === action.payload.expense.id ? action.payload.expense : expense),
            modal: false,
            editingID: ''
        }
    }

    return state
}