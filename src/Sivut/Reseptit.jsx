import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Row, Col, Image, Button, Spinner, Alert, ListGroup } from "react-bootstrap";
import toast from "react-hot-toast";
import { getMeal } from "../API";
import useFavorites from "../useFavorites";

export default function Reseptit() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError("");
      try {
        const result = await getMeal(id);
        if (!cancelled) setMeal(result);
      } catch (err) {
        if (!cancelled) setError("Reseptin lataaminen epäonnistui. Yritä uudelleen.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Ladataan...</span>
        </Spinner>
      </div>
    );
  }

  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!meal) return <Alert variant="info">Reseptiä ei löytynyt.</Alert>;

  // Rajapinta antaa ainesosat kentissä strIngredient1...strIngredient20
  const ingredients = Array.from({ length: 20 }, (_, i) => ({
    name: meal[`strIngredient${i + 1}`],
    measure: meal[`strMeasure${i + 1}`],
  })).filter((item) => item.name && item.name.trim());

  const steps = meal.strInstructions
    .split(/\r?\n/)
    .filter((line) => line.trim());

  function handleFavorite() {
    const added = toggleFavorite(meal);
    toast.success(added ? "Lisätty suosikkeihin" : "Poistettu suosikeista");
  }

  const favorite = isFavorite(meal.idMeal);

  return (
    <>
      <Link to="/" className="d-inline-block mb-3">← Takaisin hakuun</Link>

      <Row className="g-4">
        <Col md={5}>
          <Image src={meal.strMealThumb} alt={meal.strMeal} fluid rounded />
        </Col>
        <Col md={7}>
          <h1>{meal.strMeal}</h1>
          <p className="text-muted">
            {meal.strCategory} · {meal.strArea}
          </p>
          <Button
            variant={favorite ? "outline-danger" : "danger"}
            onClick={handleFavorite}
            aria-pressed={favorite}
          >
            {favorite ? "Poista suosikeista" : "Lisää suosikkeihin"}
          </Button>
        </Col>
      </Row>

      <Row className="g-4 mt-2">
        <Col md={4}>
          <h2 className="h4">Ainesosat</h2>
          <ListGroup>
            {ingredients.map((item) => (
              <ListGroup.Item key={item.name}>
                {item.measure} {item.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col md={8}>
          <h2 className="h4">Valmistusohje</h2>
          {steps.map((step, index) => (
            <p key={index}>{step}</p>
          ))}
        </Col>
      </Row>
    </>
  );
}