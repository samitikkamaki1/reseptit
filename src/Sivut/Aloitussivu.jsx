import { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Spinner, Alert, Row, Col, Card } from "react-bootstrap";
import { searchMeals } from "../API";

export default function Aloitussivu() {
  const [query, setQuery] = useState("");  // hakukentän teksti, alussa tyhjä
  const [meals, setMeals] = useState([]); // löydetyt reseptit, alussa tyhjä
  const [loading, setLoading] = useState(false); // onko haku käynnissä, alussa ei
  const [error, setError] = useState(""); // virhetilanne, alussa ei virhettä
  const [searched, setSearched] = useState(false); // onko tehty hakua, alussa ei ole

  async function handleSubmit(event) {
    event.preventDefault(); // estää oletustoiminnon, joka lataa koko sivun uudestaan
    const trimmed = query.trim(); // poistaa hakusanasta ylimääräiset välilyönnit alusta ja lopusta.
    if (!trimmed) return; // lopettaa funktion jos kenttä on tyhjä

    setLoading(true); // spinneri päälle
    setError("");
    try { // hakee reseptit rajapinnasta ja tallentaa ne tilaan. 
      const results = await searchMeals(trimmed);
      setMeals(results);
      setSearched(true);
    } catch (err) { // jos haku epäonnistuu, heittää virheen, ja hyppää catch tilaan näyttämään sen
      setError("Reseptien haku epäonnistui. Tarkista verkkoyhteys ja yritä uudelleen.");
      setMeals([]);
    } finally { // suoritetaan aina, onnistui haku tai ei, jotta spinneri saadaan pois päältä
      setLoading(false); // spinneri pois
    }
  }

  return (
    <>
        {/* Sivun otsikko */}
      <h1 className="mb-4">Hae reseptejä</h1>
        {/* Hakulomake, kun käyttäjä painaa etsi tai enter, ajetaan handleSubmit */}
      <Form onSubmit={handleSubmit} className="d-flex gap-2 mb-4">
        {/* Piilotettu otsikko ruudunlukijoille, jotta kenttä on saavutettava */}
        <Form.Label htmlFor="search" className="visually-hidden">
          Hakusana
        </Form.Label>
        {/* Tekstikenttä, arvo tulee tilasta (query), ja päivittyy jokaisella kirjoitetulla merkillä  */}
        <Form.Control
          id="search"
          type="text"
          placeholder="Hae reseptin nimellä (englanniksi), esim chicken"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {/* Nappi on pois käytöstä haun aikana, jotta hakua ei voi lähettää kahdesti */}
        <Button type="submit" disabled={loading}>
          Etsi
        </Button>
      </Form>

       {/* Spinneri näkyy vain, kun loading on tosi. visually-hidden-teksti on ruudunlukijoille */}
      {loading && (
        <div className="text-center my-4">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Ladataan...</span>
          </Spinner>
        </div>
      )}

      {/* Punainen virheilmoitus näkyy vain, jos error- tilassa on teksti */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* "Ei löytynyt" näkyy vasta kun haku on tehty, se on valmis, virheitä ei ole eikä tuloksia ole */}
      {!loading && !error && searched && meals.length === 0 && (  
        <Alert variant="info">Reseptejä ei löytynyt. Kokeile toista hakusanaa. </Alert>
      )}

       {/* Tulosruudukko: Row/Col määrittävät korttien määrän riviä kohti näytön koon mukaan
          (1 pienellä näytöllä, 2, 3 ja 4 isommilla) */}
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {/* map käy reseptilistan läpi ja tekee jokaisesta reseptistä kortin.
            key auttaa Reactia erottamaan kortit toisistaan */}
        {meals.map((meal) => (
          <Col key={meal.idMeal}>
            {/* Koko kortti on linkki reseptin tietosivulle, osoitteessa on reseptin id */}
            <Card as={Link} to={`/recipe/${meal.idMeal}`} className="h-100 text-decoration-none">
              <Card.Img variant="top" src={meal.strMealThumb} alt={meal.strMeal} />
              <Card.Body>
                <Card.Title>{meal.strMeal}</Card.Title>
                 {/* Kategoria ja alkuperämaa rajapinnan tiedoista */}
                <Card.Text className="text-muted">
                  {meal.strCategory} · {meal.strArea}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}