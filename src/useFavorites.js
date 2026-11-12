import { useState } from "react"; // useState on Reactin muisti: sen avulla sivu muistaa suosikit ja piirtyy uudelleen kun ne muuttuvat

const KEY = "reseptit-suosikit"; /* Avain, jolla suosikit tallennetaan selaimen localStorageen. 
LocalStorage on selaimen oma pieni muisti, joka säilyy sivun sulkiessa. */

// Lukee tallennetut suosikit localStoragesta, ja palauttaa ne listana. Kutsutaan kerran kun hook otetaan käyttöön.
function load() {
  try {
    // localStorageen voi tallentaa vain tekstiä, joten JSON.parse muuttaa tekstin takaisin listaksi.
    // ?? [] tarkoittaa: jos mitään ei ole tallennettu (null), käytetään tyhjää listaa.
    return JSON.parse(localStorage.getItem(KEY)) ?? []; 
  } catch { // jos tallennettu data on jotenkin rikki, JSON.parse heittää virheen
    return []; // palautetaan tyhjä lista, jotta sovellus ei kaadu
  }
}
// Tämä on oma hook (nimi alkaa sanalla use). Siihen on koottu kaikki suosikkeihin liittyvä koodi yhteen paikkaan,
// jotta sekä reseptin tietosivu että suosikkisivu voivat käyttää samaa koodia eikä sitä tarvitse kirjoittaa kahdesti.
export default function useFavorites() {
   // favorites on suosikkilista, ja setFavorites päivittää sitä.
  // useState(load) ajaa load-funktion vain kerran alussa, ei joka kerta kun sivu piirtyy.
  const [favorites, setFavorites] = useState(load);

  // Tallentaa uuden listan. Päivitys tehdään kahteen paikkaan:
  function save(list) {
    setFavorites(list); // tilaan, jotta sivu piirtyy uudelleen ja uusi lista näkyy heti
    localStorage.setItem(KEY, JSON.stringify(list)); // selaimen muistiin tekstinä (JSON.stringify), jotta suosikit säilyvät
  }

  function isFavorite(id) {  // Kertoo, onko resepti jo suosikeissa.
    return favorites.some((f) => f.idMeal === id);  // some käy listan läpi ja palauttaa true, jos jonkin reseptin id on sama kuin annettu id
  }

  // Lisää suosikin tai poistaa sen, jos se on jo listalla (toggle = vaihda tilaa).
  // Palauttaa true, jos lisättiin, ja false, jos poistettiin. Sivu käyttää tätä ilmoituksen tekstiin.
  function toggleFavorite(meal) {
    if (isFavorite(meal.idMeal)) { // jos resepti on jo suosikki, poistetaan se
      save(favorites.filter((f) => f.idMeal !== meal.idMeal)); // filter tekee uuden listan, jossa on kaikki muut paitsi tämä resepti
      return false;
    }
     // Muuten lisätään suosikki. Tallennetaan vain ne tiedot, joita tarvitaan korttiin,
    // ei koko reseptiä, jotta tallennettava data pysyy pienenä.
    const slim = {
      idMeal: meal.idMeal,
      strMeal: meal.strMeal,
      strMealThumb: meal.strMealThumb, // kuvan osoite
      strCategory: meal.strCategory,
      strArea: meal.strArea,
    };
    save([...favorites, slim]); // uusi lista: kaikki vanhat suosikit (...favorites) ja uusi perässä
    return true;
  }
   // Annetaan lista ja funktiot sivujen käyttöön
  return { favorites, isFavorite, toggleFavorite };
}
