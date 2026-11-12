import { Routes, Route, Link } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Toaster } from "react-hot-toast";
import Home from "./Sivut/Aloitussivu.jsx";
import Resepti from "./Sivut/Reseptit.jsx";
import Suosikit from "./Sivut/Suosikit.jsx";

export default function App() {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="sm">
        <Container>
          <Navbar.Brand as={Link} to="/">Reseptinhakukone!</Navbar.Brand>
          <Nav> 
            <Nav.Link as={Link} to="/">Etsi tästä resepti!</Nav.Link>
            <Nav.Link as={Link} to="/Suosikit">Omat suosikkisi!</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Container className="py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:id" element={<Resepti />} />
          <Route path="/Suosikit" element={<Suosikit />} />
        </Routes>
      </Container>

      <Toaster />
    </>
  );
}