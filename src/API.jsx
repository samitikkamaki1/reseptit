// tallennetaan osoite muuttujaan
const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

/*funktio, jossa haetaan reseptejä hakusanan perusteella. export tarkoittaa, 
että muut tiedostot voivat käyttää funktiota. async mahdollistaa asynkronisen käsittelyn ja await odottelee verkkopyynnön valmistumista.
await fetch lähettää pyynnön rajapintaan, encodeURIComponent muuttaa hakusanan URL-sopivaksi*/
export async function searchMeals(query) {
  const response = await fetch(
    `${BASE_URL}/search.php?s=${encodeURIComponent(query)}`
  );
  // jos palvelin vastaa virheellä, heitetään virhe. Tarpeellinen koska fetch ei pidä palvelimen virhettä virheenä.
  // fetch heittää virheen vain, jos verkkoyhteys puuttuu.
  if (!response.ok) {
    throw new Error(`Palvelin vastasi virheellä (${response.status})`);
  }
  // muuttaa vastauksen JSON-tekstistä JavaScript-olioksi, jota voi käyttää.
  const data = await response.json();
  //Palauttaa löydetyt reseptit, jos ei löytynyt, palauttaa tyhjän taulukon, jotta sivu ei kaadu
  return data.meals ?? [];
}
//sama ajatus, mutta hakee yksittäisen reseptin id:n perusteella. Jos ei löydy, palauttaa null
export async function getMeal(id) {
  const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
  if (!response.ok) {
    throw new Error(`Palvelin vastasi virheellä (${response.status})`);
  }
  const data = await response.json();
  // Jos resepti löytyi, palautetaan ensimmäinen resepti taulukosta, muuten null
  return data.meals ? data.meals[0] : null;
}