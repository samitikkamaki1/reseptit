import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Row, Col, Image, Button, Spinner, Alert, ListGroup } from "react-bootstrap";
import toast from "react-hot-toast";
import { getMeal } from "../API";
import useFavorites from "../useFavorites";

export default function Reseptit() {
 
  const { id } = useParams(); // useParams lukee reseptin id:n osoitteesta /recipe/:id
  const [meal, setMeal] = useState(null); // haettu resepti, alussa ei vielä mitään
  const [loading, setLoading] = useState(true); // sivu alkaa lataustilasta
  const [error, setError] = useState(""); // virheilmoituksen teksti jos haku ei onnistu
  const { isFavorite, toggleFavorite } = useFavorites();   // suosikkien logiikka tulee omasta hookista

  
  useEffect(() => { // useEffect ajetaan, kun sivu avautuu ja aina kun id vaihtuu. Tällä haetaan resepti rajapinnasta.
    let cancelled = false; // jos käyttäjä poistuu sivulta ennen kuin vastaus tulee,  tämä lippu estää tilan päivittämisen turhaan.

    async function load() {
      setLoading(true);
      setError("");
      try {
        const result = await getMeal(id); // odotetaan että rajapinta vastaa
        if (!cancelled) setMeal(result);
      } catch (err) { // jos haku epäonnistuu, käyttäjä näkee virheilmoituksen
        if (!cancelled) setError("Reseptin lataaminen epäonnistui. Yritä uudelleen.");
      } finally { // ajetaan aina, spinneri lähtee pois vaikka tulisi virhe
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { // siivous: ajetaan kun sivulta lähdetään pois
      cancelled = true;
    };
  }, [id]);

  // Näytetään oikea viesti sen mukaan mikä tilanne on, ennen kuin näytetään itse resepti
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

  // Rajapinta antaa ainesosat kentissä strIngredient1...strIngredient20, Tässä ne kerätään yhdeksi listaksi, jotta ne saadaan näytettyä helposti.
  const ingredients = Array.from({ length: 20 }, (_, i) => ({
    name: meal[`strIngredient${i + 1}`],
    measure: meal[`strMeasure${i + 1}`],
  })).filter((item) => item.name && item.name.trim()); // tyhjät ainesosat otetaan pois

  const steps = meal.strInstructions
    .split(/\r?\n/)  // ohje tulee yhtenä isona tekstinä, joten pilkotaan se riveiksi
    .filter((line) => line.trim());

  function handleFavorite() { // kun suosikkinappia painaa, lisää tai poistaa suosikin
    const added = toggleFavorite(meal); // palauttaa true jos lisättiin ja false jos poistettiin
    toast.success(added ? "Lisätty suosikkeihin" : "Poistettu suosikeista");
  }

  const favorite = isFavorite(meal.idMeal); // tarkistetaan onko tää resepti jo suosikeissa

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