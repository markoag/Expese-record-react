import { ChangeEvent, useMemo, useState } from "react";
import { useBudget } from "../hooks/useBudget";

export default function BudgetForm() {
  const [budget, setBudget] = useState(0);
  const { dispatch } = useBudget();

  const handelChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBudget(e.target.valueAsNumber);
  };

  const handelSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    dispatch({type: 'add-budget', payload: {budget}})
  }

  // Validar numeros
  const isValid = useMemo(() => {
    return isNaN(budget) || budget <= 0;
  }, [budget]);

  return (
    <form className="space-y-5" onSubmit={handelSubmit}>
      <div className="flex flex-col space-y-5">
        <label
          htmlFor="budget"
          className="text-4xl text-blue-600 font-bold text-center"
        >
          Definir Presupuesto
        </label>
      </div>
      <input
        type="number"
        id="budget"
        name="budget"
        placeholder="Ejemplo: 1000"
        className="w-full p-2 border border-gray-300 rounded-lg"
        value={budget}
        onChange={handelChange}        
      />

      <input
        type="submit"
        value="Definir Presupuesto"
        className="bg-blue-600 hover: bg-blue-700 cursor-pointer w-full p-2 text-white font-black uppercase rounded-lg disabled:opacity-40"
        disabled={isValid}
      />
    </form>
  );
}
