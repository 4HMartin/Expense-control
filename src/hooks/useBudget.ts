// Custom hook para acceder al contexto sin necesidad de importar useContext directamente en cada componente
// Este hook permite acceder al estado y al dispatch del BudgetContext de manera sencilla
import { useContext } from "react";
import { BudgetContext } from "../context/BudgetContext";

export const useBudget = () => {
    // 1. Importar el contexto
    const context = useContext(BudgetContext);

    // 2. Verificar si el contexto es undefined (esto puede ocurrir si se usa fuera del Provider)
    if (!context) {
        throw new Error("useBudget must be used within a BudgetProvider");
    }

    // 3. Retornar el contexto
    return context;
}