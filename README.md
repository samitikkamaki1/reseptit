RESEPTISELAIN

Reseptiselain on React-sovellus, jolla voi hakea ruokareseptejä, katsoa reseptin ainesosat ja valmistusohjeen sekä tallentaa suosikkireseptejä omalle suosikkisivulle. Sovellus on tehty kenelle tahansa, joka etsii ideoita ruoanlaittoon.

**Julkaistu sovellus:** https://samitikkamaki1.github.io/reseptit/
**Repositorio:** https://github.com/samitikkamaki1/reseptit

## Näkymät

1. **Haku** (`/`): hae reseptejä nimellä ja selaa tuloksia korteilla.
2. **Reseptin tiedot** (`/recipe/:id`): kuva, ainesosat, valmistusohje ja suosikkeihin lisäys.
3. **Omat suosikit** (`/favorites`): tallennetut reseptit, joita voi myös poistaa.

## Käytetyt tekniikat ja kirjastot

- [React](https://react.dev/) ja [Vite](https://vite.dev/): sovelluksen pohja ja kehityspalvelin
- [react-bootstrap](https://react-bootstrap.github.io/) ja [Bootstrap](https://getbootstrap.com/): tyylit ja responsiiviset komponentit
- [react-router-dom](https://reactrouter.com/): siirtyminen näkymien välillä
- [react-hot-toast](https://react-hot-toast.com/): ilmoitukset (esim. "Lisätty suosikkeihin")
- [gh-pages](https://www.npmjs.com/package/gh-pages): julkaisu GitHub Pagesiin
- [TheMealDB](https://www.themealdb.com/api.php): ilmainen REST API, josta reseptit haetaan (`fetch` ja `async/await`). Käytössä on ilmainen testiavain `1`.

## Ajaminen paikallisesti

Tarvitset koneelle [Node.js](https://nodejs.org/):n (LTS-versio).

1. Lataa projekti:
   ```bash
   git clone https://github.com/samitikkamaki1/reseptit.git
   cd reseptit
   ```
2. Asenna riippuvuudet:
   ```bash
   npm install
   ```
3. Käynnistä kehityspalvelin:
   ```bash
   npm run dev
   ```
4. Avaa selaimessa terminaalin näyttämä osoite, yleensä `http://localhost:5173/`.

## Julkaisu GitHub Pagesiin

```bash
npm run deploy
```

Komento rakentaa sovelluksen (`npm run build`) ja julkaisee `dist`-kansion `gh-pages`-haaraan.

## Rakenne

```
src/
  Sivut/          Aloitussivu, Reseptit ja Suosikit (kolme näkymää)
  api.jsx         TheMealDB-kutsut (haku ja yksittäinen resepti)
  useFavorites.js suosikkien tallennus selaimen localStorageen
  App.jsx         navigaatio ja reitit
  main.jsx        sovelluksen käynnistys (HashRouter)
``` 