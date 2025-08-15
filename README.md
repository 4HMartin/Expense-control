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

## Tecnologías

- ⚛️ **React.js** + **TypeScript**
- **Context API - createContext** --
- 🛠️ **useReducer** for advanced state management
- 💽 **useMemo** for calculation optimization
- **customHook** *useBudget.ts* --

## 🛠️ React Hooks utilizados

### useReducer

`useReducer` is a React Hook that provides an alternative to `useState` for managing more complex state logic. It is especially useful when:

- The new state depends on the previous state.
- The state consists of multiple sub-values.
- Complex state transitions or conditional logic are required.

In this project, `useReducer` is used to manage all logic related to menu order handling.

**Reducer Location:**  
`order-reducer.ts`

Since this project does not implement global state management, the reducer is imported into `App.tsx` and passed down to child components via props. The `useReducer` hook initializes and provides both state and dispatch functions.

**Defined Actions:**

```ts
export type OrderActions =
  | { type: 'add-item', payload: { item: MenuItem } }
  | { type: 'remove-item', payload: { id: MenuItem['id'] } }
  | { type: 'place-order' }
  | { type: 'add-tip', payload: { value: number } }
```

## Anotaciones de types definidos

**type Expense:** Corresponse al tipado completo (con id) del gasto, el id se agrega solo al insertarlo en bdd.

**type DraftExpense:** Copia del type *Expense* omitiendo el id mediante el *type expression* *Omit* para los borradores de gastos antes de asignarle un id.

**type Category:** Corresponse al tipo de categoría del gasto. Se implementa en data/categories.ts

**type Value & ValuePiece:** Son los types predefinidos de la dependencia *react-date-picker*.

## 🚀 Principales Aprendizajes

- Practical migration from a *custom hook (useCart.ts)* to the **`useReducer`** hook to manage complex state logic.  
- Type-safe handling of form events and actions using **TypeScript**.  
- Application of `useMemo` to optimize performance in real-time calculations.


---
# 📊 Tips and Consumption Calculator - React.js
🌐 *[expense-management.4hmartin.com](https://expense-management.4hmartin.com/)*
---


---
*ESPAÑOL*

# 🧮 Calculadora de propinas y consumo - React.js
🌐 *[tips-consumption-calculator.4hmartin.com](https://tips-consumption-calculator.4hmartin.com/)*
---
## Descripción

Simulador para calcular el consumo y propinas de un restaurante.

## Características

✅ **Refactorización:** El proyecto, en su primera versión, fue desarrollado utilizando un *custom hook* y, para profundizar en la práctica de nuevas formas de manejo del estado, toda la lógica fue migrada al uso de **`useReducer`**.

✅ Lista de elementos del menú:  
- **Elementos:** Lista de ítems del menú extraída desde un archivo con un arreglo de objetos tipados.  
- **Clic en elementos:** Permite agregar el ítem a la orden.

✅ Registro de consumo:
- **Items seleccionados:** Se muestran los items/articulos seleccionados del menú, donde el usuario puede consultar su precio unitario así como el computo total en base a la cantidad agregado y también puede eliminar el item.

- **Propina:** Formulario con tres opciones para seleccionar el porcentaje de propina en base al subtotal a pagar.

- **Total:** Cálculo total a pagar haciendo un desglose del subtotal más la propina seleccionada.

- **Botón 'Guardar Orden':** Simula la petición de la comanda, restableciendo así el apartado de consumo.

## Tecnologías

- ⚛️ **React.js** + **Typescript**
- 🛠️ **useReducer** manejo avanzado del estado
- 💽 **useMemo** optimización de los cálculos

## 🛠️ React Hooks utilizados

### useReducer

`useReducer` es un hook de React que ofrece una alternativa a `useState` para gestionar lógica de estado más compleja. Es especialmente útil cuando:

- El nuevo estado depende del estado anterior.
- El estado se compone de múltiples subvalores.
- Se requieren transiciones de estado complejas o lógica condicional.

En este proyecto, `useReducer` se utiliza para manejar toda la lógica relacionada con la gestión de la orden del menú.

**Reducer Location:**  
`order-reducer.ts`

Dado que este proyecto no implementa un manejo de estado global, el reducer se importa en `App.tsx` y se pasa a los componentes hijos mediante props. El hook `useReducer` se encarga de inicializar y proporcionar el estado y las funciones de dispatch.

**Acciones definidas:**

```ts
export type OrderActions =
    { type: 'add-item', payload: { item: MenuItem } } |
    { type: 'remove-item', payload: { id: MenuItem['id'] } } |
    { type: 'place-order' } |
    { type: 'add-tip', payload: { value: number } }
```

---
### useMemo

`useMemo` es un hook de optimización de rendimiento que memoriza el resultado de un cálculo costoso. El valor memorizado solo se vuelve a calcular cuando una de sus dependencias cambia.

En este proyecto, `useMemo` se utiliza para calcular de forma eficiente el total a pagar.

**Ruta de ejemplo:**  
`OrderTotals.tsx`

**Ejemplo:**

```ts
    const subtotalAmount = useMemo(() => order.reduce((subTotal, item) => subTotal + (item.price * item.quantity) , 0 ) ,[order])

    const tipAmount = useMemo(() => {return subtotalAmount * tip}, [tip, order])

    const totalAmount = useMemo(() => {return subtotalAmount + tipAmount}, [tip, order])
```

## 🚀 Principales Aprendizajes

- Migración práctica de un *custom hook (useCart.ts)* al hook **`useReducer`** para gestionar lógica de estado compleja.
- Manejo tipado de eventos de formulario y acciones utilizando **TypeScript**.
- Aplicación de `useMemo` para optimizar el rendimiento en cálculos en tiempo real.