import { Link } from "react-router-dom";
import { Row, Col, Card, Button, Alert } from "react-bootstrap";
import toast from "react-hot-toast";
import useFavorites from "../useFavorites";

export default function Suosikit() {
  const { favorites, toggleFavorite } = useFavorites();

  function handleRemove(meal) {
    toggleFavorite(meal);
    toast.success("Resepti on poistettu suosikeista");
  }

  return (
    <>
      <h1 className="mb-4">Omat suosikit</h1>

      {favorites.length === 0 ? (
        <Alert variant="info">
          Ei vielä suosikkeja. <Link to="/">Hae reseptejä</Link> ja lisää niitä tänne.
        </Alert>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {favorites.map((meal) => (
            <Col key={meal.idMeal}>
              <Card className="h-100">
                <Link to={`/recipe/${meal.idMeal}`}>
                  <Card.Img variant="top" src={meal.strMealThumb} alt={meal.strMeal} />
                </Link>
                <Card.Body className="d-flex flex-column">
                  <Card.Title>
                    <Link to={`/recipe/${meal.idMeal}`} className="text-decoration-none">
                      {meal.strMeal}
                    </Link>
                  </Card.Title>
                  <Card.Text className="text-muted">
                    {meal.strCategory} · {meal.strArea}
                  </Card.Text>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    className="mt-auto"
                    onClick={() => handleRemove(meal)}
                  >
                    Poista
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </>
  );
}