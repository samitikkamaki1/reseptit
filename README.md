# Reseptiselain

Tämä on kurssin loppuprojekti. Sovelluksella voi hakea ruokareseptejä, katsoa reseptin ainesosat ja ohjeen sekä tallentaa omia suosikkeja.

Julkaistu sivu: https://samitikkamaki1.github.io/reseptit/

GitHub-repositorio: https://github.com/samitikkamaki1/reseptit

## Mitä sovellus tekee

Sovelluksessa on kolme sivua:

1. Haku: reseptejä haetaan hakusanalla englanniksi(esim. chicken tai pasta).
2. Reseptin tiedot: näyttää kuvan, ainesosat ja valmistusohjeen. Sieltä reseptin voi lisätä suosikkeihin.
3. Omat suosikit: näyttää tallennetut reseptit, ja niitä voi poistaa.

Suosikit tallentuvat selaimen localStorageen, joten ne säilyvät, vaikka sivun sulkisi.

## Käytetyt kirjastot ja API

- React ja Vite: sovelluksen pohja
- react-bootstrap ja Bootstrap: ulkoasu ja responsiivisuus
- react-router-dom: sivujen välillä liikkuminen
- react-hot-toast: pienet ilmoitukset, esim. "Lisätty suosikkeihin"
- gh-pages: sivun julkaisu GitHub Pagesiin
- TheMealDB (https://www.themealdb.com/api.php): ilmainen API, josta reseptit haetaan

## Näin sovelluksen saa käyntiin omalla koneella

Koneella pitää olla asennettuna Node.js.

1. Lataa projekti koneelle:

```
git clone https://github.com/samitikkamaki1/reseptit.git
```

2. Mene projektin kansioon:

```
cd reseptit
```

3. Asenna tarvittavat paketit:

```
npm install
```

4. Käynnistä sovellus:

```
npm run dev
```

5. Avaa selaimessa osoite, jonka terminaali näyttää (yleensä http://localhost:5173/).

## Julkaisu

Sivu julkaistaan GitHub Pagesiin tällä komennolla:

```
npm run deploy
```

## Tiedostot

- src/Sivut: kolme sivua (Aloitussivu, Reseptit, Suosikit)
- src/API.jsx: tässä haetaan tiedot TheMealDB:stä
- src/useFavorites.js: suosikkien tallennus ja poisto
- src/App.jsx: yläpalkki ja sivujen reitit
- src/main.jsx: sovelluksen käynnistys