import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
// Importar el Provider en el main.tsx y envolver la aplicacion con el Provider para que todos los componentes tengan acceso al contexto
//    - Esto permite que cualquier componente dentro de la aplicacion pueda acceder al estado global y despachar acciones para modificarlo.
import { BudgetProvider } from './context/BudgetContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BudgetProvider>
      <App />
    </BudgetProvider>
  </StrictMode>,
)
