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
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    setLoading(true);
    setError("");
    try {
      const results = await searchMeals(trimmed);
      setMeals(results);
      setSearched(true);
    } catch (err) {
      setError("Reseptien haku epäonnistui. Tarkista verkkoyhteys ja yritä uudelleen.");
      setMeals([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h1 className="mb-4">Hae reseptejä</h1>

      <Form onSubmit={handleSubmit} className="d-flex gap-2 mb-4">
        <Form.Label htmlFor="search" className="visually-hidden">
          Hakusana
        </Form.Label>
        <Form.Control
          id="search"
          type="text"
          placeholder="Hae reseptin nimellä (englanniksi), esim chicken"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button type="submit" disabled={loading}>
          Etsi
        </Button>
      </Form>

      {loading && (
        <div className="text-center my-4">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Ladataan...</span>
          </Spinner>
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && searched && meals.length === 0 && (  
        <Alert variant="info">Reseptejä ei löytynyt. Kokeile toista hakusanaa. </Alert>
      )}

      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {meals.map((meal) => (
          <Col key={meal.idMeal}>
            <Card as={Link} to={`/recipe/${meal.idMeal}`} className="h-100 text-decoration-none">
              <Card.Img variant="top" src={meal.strMealThumb} alt={meal.strMeal} />
              <Card.Body>
                <Card.Title>{meal.strMeal}</Card.Title>
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