import React from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "./movie-card.scss";

export const MovieCard = ({ movie, user, setUser }) => {
  const storedToken = localStorage.getItem("token");
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (user.FavoriteMovies.includes(movie.id)) {
      setIsFavorite(true);
    }
  }, [user]);
  
  //allow users to add a movie to their favorites list
  const addFavorite = () => {
    fetch(`https://myflixapi-3voc.onrender.com/users/${user.Username}/movies/${movie.id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${storedToken}`
      }
    }).then((response) => {
      if(response.ok) {
        return response.json();
      } else {
        alert("Unable to add movie to favorites")
      }
    }).then((user) => {
      if(user) {
        alert("Movie added to favorites");
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        setIsFavorite(true);
      }
    })
    .catch((error) => {
      alert(error);
    });
  };

  return (
    <Card className="movie-card h-100">
      <Card.Img variant="top" src={movie.imagePath} />
      <Card.Body>
        <Card.Title className="card-title">{movie.title}</Card.Title>
        <Card.Text>{movie.description}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button variant="link">Open</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

//defining prop-type constraints
MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired}).isRequired,
  onMovieClick: PropTypes.func.isRequired
};