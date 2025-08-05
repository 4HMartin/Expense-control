# 📊 Tips and Consumption Calculator - React.js
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

✅ List of menu items:
- **Items:** List of menu items extracted from file with array of typed objects.
- **Click on items:** Allows you to add the item to the order.

✅ **Order Summary:**

- **Selected Items:** Displays the selected menu items, where users can view the unit price, the total cost based on the quantity selected, and also remove individual items.

- **Tip Selection:** A form with three options to select the tip percentage based on the subtotal amount.

- **Total:** Calculates the final amount to pay by adding the selected tip to the subtotal.

- **'Place Order' Button:** Simulates sending the order, resetting the order summary section afterward.

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