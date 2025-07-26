import { createContext, useReducer, type Dispatch, type ReactNode } from "react"
import { budgetReducer, initialState, type BudgetActions, type BudgetState } from "../reducers/budget-reducer"
/**
 * Context API + useReducer
 */

// 4. Crear el type de contexto (Que datos va a tener el contexto) en base a los datos que maneja el Provider
export type BudgetContextProps = {
    state: BudgetState
    dispatch: Dispatch<BudgetActions>
}

// 9. Crear el type de las props del Provider
//    - children: ReactNode permite que el Provider pueda recibir cualquier tipo de componente hijo
type BudgetProviderProps = {
    children: ReactNode
}

// 3. Crear el contexto (Accion de tener el estado global)
// 5. Se define el generic <BudgetContextProps> para indicar que el contexto va a manejar un objeto con las propiedades state y dispatch del provider
// 6. El paramaetro 'null!' indica que el contexto no tiene un valor inicial, y se debe proveer por el Provider (convencion de TypeScript)
export const BudgetContext = createContext<BudgetContextProps>(null!)

// 1. Crear el Provider (De donde vienen los datos)
// 10. El Provider es un componente que va a envolver a los componentes que necesiten acceder al contexto, por tanto se recibe children como props
export const BudgetProvider = ({children}: BudgetProviderProps) => {

    // 2. Instanciar el reducer
    const [state, dispatch] = useReducer(budgetReducer, initialState)

    // 7. Retornar el contexto con el estado y el dispatch con sintaxis de componente
    return (
        // 8. Pasar el estado y el dispatch como valor del contexto
        <BudgetContext.Provider value={{ state, dispatch }}>
            {children}
        </BudgetContext.Provider>
    )
}
// 11. Importar el Provider en el main.tsx y envolver la aplicacion con el Provider para que todos los componentes tengan acceso al contexto
//    - Esto permite que cualquier componente dentro de la aplicacion pueda acceder al estado global y despachar acciones para modificarlo.