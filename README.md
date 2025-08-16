# 📊 Expense Management - React.js
🌐 *[expense-management.4hmartin.com](https://expense-management.4hmartin.com/)*
---
## Description

Expense management where we can define an initial budget using a form with validations. The main interface (using Headless UI) displays four main elements.

The first is the budget calculations (initial amount, available amount, and amount spent) with visual support (circular bar chart) and a button to restart the app, allowing you to re-enter a value for the initial budget.

A selector to filter expenses by available categories.

A list of the expenses entered, with information about each entry.

And a button at the bottom right to open a modal window showing the form for adding a new expense to the app.

A boilerplate is implemented using Context API and useReducer to manage the state globally, facilitating access to the different states through a custom hook.

### ↓ Preview

![app_gif](url)

## Features

✅ **Context API + useReducer + custom hook:** 
- **BudgetContext.tsx** Using Context API and useReducer results in a more efficient and scalable design.
- **budget-reducer.ts state type:**
```ts
export type BudgetState = {
    budget: number;
    modal: boolean;
    expenses: Expense[];
    editingID: Expense['id'];
    currentCategory: Category['id']
}
```
- **budget-reducer.ts actions:**
```ts
export type BudgetActions = 
    { type: 'add-budget', payload: { budget: number } } |
    { type: 'show-modal' } |
    { type: 'close-modal' } |
    { type: 'add-expense', payload: { expense: DraftExpense }} |
    { type: 'remove-expense', payload: { id: Expense['id'] }} |
    { type: 'get-expense-by-id', payload: { id: Expense['id'] }} |
    { type: 'update-expense', payload: { expense: Expense }} |
    { type: 'reset-app' } |
    { type: 'add-filter-category', payload: { id: Category['id'] }}
```

✅ 'Define your budget:
- Numeric input to define the initial budget and enable the button.

✅ **Monitoring panel (BudgetTracker.tsx):**

- **Circular chart:** Using the “react-circular-progressbar” library, a graph is rendered showing the percentage of the budget spent.
```tsx
<CircularProgressbar
    value={percentage}
    styles={buildStyles({
        pathColor: percentage === 100 ? '#DC2626' : '#3B82F6',
        trailColor: '#F5F5F5',
        textSize: '8',
        textColor: percentage === 100 ? '#DC2626' : '#3B82F6'
    })}
    text={`${percentage}% Spent`}
/>
```

- **'RESET APP' button:** As its name suggests, it resets the initial budget to 0 using “dispatch”.
```tsx
<button
    type="button"
    className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg cursor-pointer hover:bg-pink-700 transition-colors"
    onClick={() => dispatch({type: 'reset-app'})}
>
    Reset App
</button>
```

- **'Budget', 'Available' y 'Spent':** The reusable “AmountDisplay” component displays the values calculated based on the initial budget and accumulated expenses.
```tsx
<AmountDisplay 
    label="Budget"
    amount={state.budget}
/>
```

✅ **Filter by category selector (FilterByCategory.tsx):**
- **Select:** Import the categories from the “/data/categories” file to iterate and display select options.
- **Change event + dispatch:**
```tsx
const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: 'add-filter-category', payload: { id: e.target.value }})
}
```

✅ **Icon to display the modal with the form (ExpenseModal.tsx):**
- **heroicons** to import the “+” icon, *PlusCircleIcon*.
- **headlessui** to import *Dialog* and *Transition* to handle the logic of the modal with the form.

✅ **Form to add new expense (ExpenseForm.tsx):**
Two main types of expenses are defined: “DraftExpense” without an ID and “Expense” with an ID (added from reducer once the data has been validated).

Simple validation to check that all fields have been filled in and that the budget limit has not been reached.

From the “state” imported via the custom hook “useBudget”, it is evaluated whether the ID of the expense to be edited “state.editingID” is defined in order to fill in the form fields with the expense to be edited or not.
```tsx
// Add new expense or edit vía dispatch
if(state.editingID){
    dispatch({ type: 'update-expense', payload: {expense: { id: state.editingID, ...expense }} })
} else {
    dispatch({ type: 'add-expense', payload: { expense } })
}
```

For the date picker field, the “react-date-picker” library is used:
```tsx
import DatePicker from 'react-date-picker';

<DatePicker
    name="expenseDate"
    id="expenseDate"
    className="bg-slate-100 p-2"
    onChange={handleChangeDate}
    value={expense.date}
/>
```

## Technologies

- ⚛️ **React.js** + **TypeScript**
- **Context API - createContext** Allows you to create a global access 'context'
- 🛠️ **useReducer** for advanced state management
- 💽 **useMemo** to optimise cached calculations
- **customHook** *useBudget.ts* Allows access to the “context” in a simple import

## 🛠️ React Hooks used

### useReducer

`useReducer` is a React hook that offers an alternative to `useState` for managing more complex state logic. It is especially useful when:

- The new state depends on the previous state.
- The state consists of multiple sub-values.
- Complex state transitions or conditional logic are required.

In this project, `useReducer` is used to handle all logic related to managing expenses added via the modal form.

**Reducer Location:**  
`src/reducers/budget-reducer.ts`

The reducer is imported into the “BudgetContext.tsx” file to instantiate the reducer and thus allow access to the state and actions of the reducer in the global context.
```tsx
import { budgetReducer, initialState, type BudgetActions, type BudgetState } from "../reducers/budget-reducer"

export const BudgetProvider = ({children}: BudgetProviderProps) => {

    // 2. Instanciar el reducer
    const [state, dispatch] = useReducer(budgetReducer, initialState)
    ...
```

**Defined Actions:**
```ts
export type BudgetActions = 
    { type: 'add-budget', payload: { budget: number } } |
    { type: 'show-modal' } |
    { type: 'close-modal' } |
    { type: 'add-expense', payload: { expense: DraftExpense }} |
    { type: 'remove-expense', payload: { id: Expense['id'] }} |
    { type: 'get-expense-by-id', payload: { id: Expense['id'] }} |
    { type: 'update-expense', payload: { expense: Expense }} |
    { type: 'reset-app' } |
    { type: 'add-filter-category', payload: { id: Category['id'] }}
```

## Anotaciones de types definidos

**type Expense:** Corresponds to the complete typing (with ID) of the expense; the ID is added only when inserting it into the database.

**type DraftExpense:** Copy the *Expense* type, omitting the ID using the *type expression* *Omit* for expense drafts before assigning them an ID.

**type Category:** Corresponds to the type of expense category. Implemented in data/categories.ts

**type Value & ValuePiece:** These are the predefined types of the *react-date-picker* dependency.

---
*ESPAÑOL*

# 📊 Gestor de gastos - React.js
🌐 *[expense-management.4hmartin.com](https://expense-management.4hmartin.com/)*
---
## Descripción

Planificador de gastos donde podemos definir un presupuesto inicial mediante un formulario con validaciones, en la interfaz principal (utilizando Headless UI) se muestran cuatro elementos principales.

El primero son los cálculos del presupuesto (monto inicial, disponible y gastado) con apoyo visual (gráfico de barra circular) y un botón para reiniciar la app permitiendo volver a introducir un valor para el presupuesto inicial.

Un selector para poder filtrar los gastos mediante las categorias disponibles.

El listado mediante tarjetas de los gastos introducidos, con la información de cada entrada.

Y un botón en la parte inferior derecha para abrir un modal donde se muestra el formulario para agregar un nuevo gasto a la app.

Se implementa un boilerplate mediante el uso de Context API y el uso de useReducer para gestionar el state de forma global, facilitando el acceso a los diferentes states mediante un custom hook.

### ↓ Vista previa

![app_gif](url)

## Características

✅ **Context API + useReducer + custom hook:** 
- **BudgetContext.tsx** Utilizando Context API y el uso de useReducer se logra un diseño más eficiente y escalable.
- **budget-reducer.ts state type:**
```ts
export type BudgetState = {
    budget: number;
    modal: boolean;
    expenses: Expense[];
    editingID: Expense['id'];
    currentCategory: Category['id']
}
```
- **budget-reducer.ts actions:**
```ts
export type BudgetActions = 
    { type: 'add-budget', payload: { budget: number } } |
    { type: 'show-modal' } |
    { type: 'close-modal' } |
    { type: 'add-expense', payload: { expense: DraftExpense }} |
    { type: 'remove-expense', payload: { id: Expense['id'] }} |
    { type: 'get-expense-by-id', payload: { id: Expense['id'] }} |
    { type: 'update-expense', payload: { expense: Expense }} |
    { type: 'reset-app' } |
    { type: 'add-filter-category', payload: { id: Category['id'] }}
```

✅ 'Define your budget:
- Input de tipo numérico para definir el presupuesto inicial y habilitar el botón. 

✅ **Panel de seguimiento (BudgetTracker.tsx):**

- **Gráfico circular:** Mediante el uso de la libreria 'react-circular-progressbar' se renderiza un gráfico donde se muestra el porcentaje del presupuesto gastado.
```tsx
<CircularProgressbar
    value={percentage}
    styles={buildStyles({
        pathColor: percentage === 100 ? '#DC2626' : '#3B82F6',
        trailColor: '#F5F5F5',
        textSize: '8',
        textColor: percentage === 100 ? '#DC2626' : '#3B82F6'
    })}
    text={`${percentage}% Spent`}
/>
```

- **Botón 'RESET APP':** Como su nombre indica, restablece el presupuesto inicial a 0 mediante 'dispatch'.
```tsx
<button
    type="button"
    className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg cursor-pointer hover:bg-pink-700 transition-colors"
    onClick={() => dispatch({type: 'reset-app'})}
>
    Reset App
</button>
```

- **'Budget', 'Available' y 'Spent':** Mediante el componente reutilizable 'AmountDisplay' se muestran los valores calculados en base al presupuesto inicial y los gastos acumulados.
```tsx
<AmountDisplay 
    label="Budget"
    amount={state.budget}
/>
```

✅ **Filtro mediante selector de categoria (FilterByCategory.tsx):**
- **Select:** Importar las categorías desde fichero '/data/categories' para iterar y mostrar opciones del select.
- **Change event + dispatch:**
```tsx
const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: 'add-filter-category', payload: { id: e.target.value }})
}
```

✅ **Icono para mostrar el modal con el formulario (ExpenseModal.tsx):**
- **heroicons** para importar el icono '+', *PlusCircleIcon*.
- **headlessui** para importar *Dialog* y *Transition* para manejar la lógica del modal con el formulario.

✅ **Formulario para agregar nuevo gasto (ExpenseForm.tsx):**
Se definen dos tipos principales para los gastos, 'DraftExpense' sin ID y 'Expense' con ID (se agrega desde reducer una vez validado los datos).

Validación simple para comprobar que todos los campos han sido rellenados y que el límite del presupuesto no se ha alcanzado.

Desde el 'state' importado mediante el custom hook 'useBudget' se evalua si existe definido el id del gasto a editar 'state.editingID' para rellenar los campos del formulario con el gasto a editar o no.
```tsx
// Add new expense or edit vía dispatch
if(state.editingID){
    dispatch({ type: 'update-expense', payload: {expense: { id: state.editingID, ...expense }} })
} else {
    dispatch({ type: 'add-expense', payload: { expense } })
}
```

Para el campo del selector de fecha, se utiliza la librería 'react-date-picker':
```tsx
import DatePicker from 'react-date-picker';

<DatePicker
    name="expenseDate"
    id="expenseDate"
    className="bg-slate-100 p-2"
    onChange={handleChangeDate}
    value={expense.date}
/>
```

## Tecnologías

- ⚛️ **React.js** + **TypeScript**
- **Context API - createContext** Permite crear un 'contexto' de acceso global
- 🛠️ **useReducer** para la gestión de un state avanzado
- 💽 **useMemo** para optimizar los cálculos en caché
- **customHook** *useBudget.ts* Permite el acceso al 'contexto' en una simple importación

## 🛠️ React Hooks utilizados

### useReducer

`useReducer` es un hook de React que ofrece una alternativa a `useState` para gestionar lógica de estado más compleja. Es especialmente útil cuando:

- El nuevo estado depende del estado anterior.
- El estado se compone de múltiples subvalores.
- Se requieren transiciones de estado complejas o lógica condicional.

En este proyecto, `useReducer` se utiliza para manejar toda la lógica relacionada con la gestión de los gastos agregados mediante el formulario del modal.

**Reducer Location:**  
`src/reducers/budget-reducer.ts`

El reducer se importa en el fichero 'BudgetContext.tsx' para instanciar el reducer y permitir así el acceso al state y las acciones del reducer en el contexto global.
```tsx
import { budgetReducer, initialState, type BudgetActions, type BudgetState } from "../reducers/budget-reducer"

export const BudgetProvider = ({children}: BudgetProviderProps) => {

    // 2. Instanciar el reducer
    const [state, dispatch] = useReducer(budgetReducer, initialState)
    ...
```

**Defined Actions:**
```ts
export type BudgetActions = 
    { type: 'add-budget', payload: { budget: number } } |
    { type: 'show-modal' } |
    { type: 'close-modal' } |
    { type: 'add-expense', payload: { expense: DraftExpense }} |
    { type: 'remove-expense', payload: { id: Expense['id'] }} |
    { type: 'get-expense-by-id', payload: { id: Expense['id'] }} |
    { type: 'update-expense', payload: { expense: Expense }} |
    { type: 'reset-app' } |
    { type: 'add-filter-category', payload: { id: Category['id'] }}
```

## Anotaciones de types definidos

**type Expense:** Corresponse al tipado completo (con id) del gasto, el id se agrega solo al insertarlo en bdd.

**type DraftExpense:** Copia del type *Expense* omitiendo el id mediante el *type expression* *Omit* para los borradores de gastos antes de asignarle un id.

**type Category:** Corresponse al tipo de categoría del gasto. Se implementa en data/categories.ts

**type Value & ValuePiece:** Son los types predefinidos de la dependencia *react-date-picker*.