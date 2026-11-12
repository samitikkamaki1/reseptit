const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export async function searchMeals(query) {
  const response = await fetch(
    `${BASE_URL}/search.php?s=${encodeURIComponent(query)}`
  );
  if (!response.ok) {
    throw new Error(`Palvelin vastasi virheellä (${response.status})`);
  }
  const data = await response.json();
  return data.meals ?? [];
}

export async function getMeal(id) {
  const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
  if (!response.ok) {
    throw new Error(`Palvelin vastasi virheellä (${response.status})`);
  }
  const data = await response.json();
  return data.meals ? data.meals[0] : null;
}