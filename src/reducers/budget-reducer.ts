import { v4 as uuidv4 } from "uuid";
import { Category, DrafExpense, Expense } from "../types";

// Definir las acciones
export type BudgetAction =
  | { type: "add-budget"; payload: { budget: number } }
  | { type: "show-modal" }
  | { type: "hide-modal" }
  | { type: "add-expense"; payload: { expense: DrafExpense } }
  | { type: "remove-expense"; payload: { id: Expense["id"] } }
  | { type: "edit-expense"; payload: { id: Expense["id"] } }
  | { type: "update-expense"; payload: { expense: Expense } }
  | { type: "restart-app" }
  | { type: "filter-by-category"; payload: { id: Category["id"] } };

// Definir el estado
export type BudgetState = {
  budget: number;
  modal: boolean;
  expenses: Expense[];
  editingId: Expense["id"];
  currentCategory: Category["id"];
};

// Definir el localStorage
const initialBudget = (): number => {
  const localStorageBudget = localStorage.getItem("budget");
  return localStorageBudget ? +localStorageBudget : 0;
};
const initialExpenses = (): Expense[] => {
  const localStorageExpenses = localStorage.getItem("expenses");
  return localStorageExpenses ? JSON.parse(localStorageExpenses) : [];
};

// Definir el estado inicial
export const initialSate: BudgetState = {
  budget: initialBudget(),
  modal: false,
  expenses: initialExpenses(),
  editingId: "",
  currentCategory: "",
};

// Crear el expense
const createExpense = (drafExpense: DrafExpense): Expense => {
  return {
    ...drafExpense,
    id: uuidv4(),
  };
};

// Definir el reducer
export const budgetReducer = (
  state: BudgetState = initialSate,
  action: BudgetAction
): BudgetState => {
  switch (action.type) {
    case "add-budget":
      return {
        ...state,
        budget: action.payload.budget,
      };
    case "show-modal":
      return {
        ...state,
        modal: true,
      };
    case "hide-modal":
      return {
        ...state,
        modal: false,
        editingId: "",
      };
    case "add-expense":
      // Se genera el Id despues de su validación
      const expense = createExpense(action.payload.expense);

      return {
        ...state,
        expenses: [...state.expenses, expense],
        modal: false,
      };
    case "remove-expense":
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense) => expense.id !== action.payload.id
        ),
        editingId: "",
      };
    case "edit-expense":
      return {
        ...state,
        editingId: action.payload.id,
        modal: true,
      };
    case "update-expense":
      return {
        ...state,
        expenses: state.expenses.map((expense) =>
          expense.id === action.payload.expense.id
            ? action.payload.expense
            : expense
        ),
        modal: false,
        editingId: "",
      };
    case "restart-app":
      return {
        ...state,
        budget: 0,
        expenses: [],
      };
    case "filter-by-category":
      return {
        ...state,
        currentCategory: action.payload.id,
      };
    default:
      return state;
  }
};
