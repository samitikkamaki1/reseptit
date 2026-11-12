import { Routes, Route, Link } from "react-router-dom"; // Routes ja Route määrittävät reitit, Link on linkki joka vaihtaa sivua
import { Container, Navbar, Nav } from "react-bootstrap"; // Bootstrapin valmiit komponentit: sisältölaatikko, yläpalkki ja linkkirivi
import { Toaster } from "react-hot-toast"; // paikka, jossa ilmoitukset (toast) näytetään
import Home from "./Sivut/Aloitussivu.jsx"; // hakusivu, tuodaan nimellä Home
import Resepti from "./Sivut/Reseptit.jsx"; // reseptin tietosivu, tuodaan nimellä Recipe
import Suosikit from "./Sivut/Suosikit.jsx"; // suosikkisivu, tuodaan nimellä Favorites

export default function App() {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="sm"> {/* Yläpalkki näkyy joka sivulla. Link vaihtaa sivua ilman että koko sivu latautuu uudestaan. */}
        <Container>
          <Navbar.Brand as={Link} to="/">Reseptinhakukone!</Navbar.Brand>  {/* Sovelluksen nimi */}
          <Nav>
            <Nav.Link as={Link} to="/">Etsi tästä resepti!</Nav.Link>    {/* Navigaatiolinkit: ensimmäinen vie hakusivulle */}
            <Nav.Link as={Link} to="/Suosikit">Omat suosikkisi!</Nav.Link>    {/* Navigaatiolinkit: toinen suosikkisivulle */}
          </Nav>
        </Container>
      </Navbar>

      <Container className="py-4">
        <Routes> {/* Reitit kertoo mikä sivu näytetään missäkin osoitteessa */}
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:id" element={<Resepti />} /> {/* :id on muuttuja, johon tulee reseptin id osoitteesta */}
          <Route path="/Suosikit" element={<Suosikit />} />
        </Routes>
      </Container>

      <Toaster />  {/* Toaster on paikka, johon react-hot-toast tuo ilmoitukset (esim. "Lisätty suosikkeihin").
          Se on tässä, koska silloin ilmoitukset toimivat kaikilla sivuilla. */}
    </>
  );
}