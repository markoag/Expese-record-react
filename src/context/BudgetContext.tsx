import { useReducer, createContext, Dispatch, ReactNode } from "react";
import {
  BudgetAction,
  BudgetState,
  budgetReducer,
  initialSate,
} from "../reducers/budget-reducer";

// Definir el contexto
type BudgetContextProps = {
  state: BudgetState;
  dispatch: Dispatch<BudgetAction>;
  totalExpenses: number;
  balance: number;
};

// Definir el Provider
type BudgetProviderProps = {
  children: ReactNode;
};

// Crear el contexto
export const BudgetContext = createContext<BudgetContextProps>(null!);

// Crear Provider o de donde vienen los datos
export const BudgetProvider = ({ children }: BudgetProviderProps) => {
  // Crear el reducer
  const [state, dispatch] = useReducer(budgetReducer, initialSate);

  // Calculamos los gastos
  const totalExpenses = state.expenses.reduce(
    (acc, expense) => acc + expense.amount,
    0
  );

  // Calculamos el saldo
  const balance = state.budget - totalExpenses;

  return (
    <BudgetContext.Provider
      value={{
        state,
        dispatch,
        totalExpenses,
        balance,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
