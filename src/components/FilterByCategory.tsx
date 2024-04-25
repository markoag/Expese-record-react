import { ChangeEvent } from "react";
import { categories } from "../data/categories";
import { useBudget } from "../hooks/useBudget";

export default function FilterByCategory() {

    const { dispatch } = useBudget()
    
    // Se obtiene el id de la categoría en el state
    const handleChangue = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch({type: "filter-by-category", payload: {id: e.target.value}})
    }

  return (
    <div className="bg-white shadow-lg rounded-lg p-10">
      <form>
        <div className="flex flex-col md:flex-row md:items-center gap-5">
          <label htmlFor="category">Filtrar Gastos</label>
          <select id="category" className="bg-slate-100 p-3 flex-1 rounded" onChange={handleChangue}>
            <option value="">--Todas las categorías--</option>
            {categories.map((category) => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
}
