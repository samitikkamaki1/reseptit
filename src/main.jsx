import { StrictMode } from "react"; // StrictMode auttaa löytämään virheitä kun kehitetään, se ei näy käyttäjälle
import { createRoot } from "react-dom/client"; // createRoot käynnistää React-sovelluksen selaimessa
import { HashRouter } from "react-router-dom"; // reititin, jonka avulla sivujen välillä voi liikkua
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrapin tyylit koko sovellukseen
import App from "./App.jsx"; // sovelluksen pääkomponentti, jossa on yläpalkki ja reitit

// Tässä sovellus käynnistetään ja App piirretään sivun root-kohtaan.
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>  {/* HashRouter laittaa osoitteeseen #-merkin. GitHub Pages ei osaa käsitellä tavallisia osoitteita, ja BrowserRouter antaisi 404-virheen
        kun sivun päivittää. HashRouterin ympärillä oleva koodi saa tietää reitin osoitteesta. */}
      <App />  {/* App on sovelluksen pääkomponentti. Se on HashRouterin sisällä, jotta Link-linkit,
          Routes ja useParams toimivat siellä ja sen alikomponenteissa. */}
    </HashRouter>
  </StrictMode>
);