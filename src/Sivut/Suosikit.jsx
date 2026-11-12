import { Link } from "react-router-dom"; // Link on linkki, joka vaihtaa sivua lataamatta koko sivua uudelleen
import { Row, Col, Card, Button, Alert } from "react-bootstrap"; // Bootstrapin valmiit komponentit: ruudukko, kortti, nappi ja ilmoituslaatikko
import toast from "react-hot-toast"; // pienet ilmoitukset käyttäjälle (esim. "Poistettu suosikeista")
import useFavorites from "../useFavorites"; // oma hook, jossa on kaikki suosikkien tallennus ja poisto

// Tällä sivulla ei haeta rajapinnasta mitään, vaan näytetään localStoragesta tallennetut suosikit. Jos niitä ei ole, näytetään ilmoitus siitä ettei ole.
export default function Suosikit() {
  const { favorites, toggleFavorite } = useFavorites();

  function handleRemove(meal) {  // Ajetaan, kun käyttäjä painaa Poista-nappia jonkin kortin kohdalla
    toggleFavorite(meal); // poistaa reseptin localStoragesta ja päivittää kortin pois ruudukosta
    toast.success("Resepti on poistettu suosikeista"); 
  }

  return (
    <>
      <h1 className="mb-4">Omat suosikit</h1> 

      {/* Tässä on ehtolauseke: jos suosikkeja ei ole yhtään, näytetään ohje.
          Muuten (kaksoispisteen jälkeen) näytetään suosikit korteilla. */}
      {favorites.length === 0 ? ( // jos lista on tyhjä
        <Alert variant="info"> 
          Ei vielä suosikkeja. <Link to="/">Hae reseptejä</Link> ja lisää niitä tänne.   {/* Linkki hakusivulle, jotta käyttäjä tietää mitä tehdä seuraavaksi */}
        </Alert>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {favorites.map((meal) => (  // map käy suosikkilistan läpi ja tekee jokaisesta reseptistä oman kortin, meal on resepti listasta
            <Col key={meal.idMeal}>
              <Card className="h-100"> 
                <Link to={`/recipe/${meal.idMeal}`}>  {/* Kuva on linkki reseptin tietosivulle. Osoitteessa on reseptin id,
                    josta tietosivu tietää minkä reseptin se hakee. */}
                  <Card.Img variant="top" src={meal.strMealThumb} alt={meal.strMeal} />  {/* alt-teksti kertoo ruudunlukijalle mitä kuvassa on */}
                </Link>
                <Card.Body className="d-flex flex-column">
                  <Card.Title>
                    <Link to={`/recipe/${meal.idMeal}`} className="text-decoration-none"> {/* Reseptin nimi on myös linkki tietosivulle */}
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
                    onClick={() => handleRemove(meal)} // klikkaus poistaa juuri tämän reseptin
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