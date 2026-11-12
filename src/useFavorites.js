import { useState } from "react";

const KEY = "reseptit-suosikit";

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) ?? [];
  } catch {
    return [];
  }
}

export default function useFavorites() {
  const [favorites, setFavorites] = useState(load);

  function save(list) {
    setFavorites(list);
    localStorage.setItem(KEY, JSON.stringify(list));
  }

  function isFavorite(id) {
    return favorites.some((f) => f.idMeal === id);
  }

  // palauttaa true jos lisättiin, false jos poistettiin
  function toggleFavorite(meal) {
    if (isFavorite(meal.idMeal)) {
      save(favorites.filter((f) => f.idMeal !== meal.idMeal));
      return false;
    }
    const slim = {
      idMeal: meal.idMeal,
      strMeal: meal.strMeal,
      strMealThumb: meal.strMealThumb,
      strCategory: meal.strCategory,
      strArea: meal.strArea,
    };
    save([...favorites, slim]);
    return true;
  }

  return { favorites, isFavorite, toggleFavorite };
}
