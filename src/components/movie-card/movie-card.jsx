import React, { useState, useEffect } from "react";
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
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        setIsFavorite(true);
      }
    })
    .catch((error) => {
      alert(error);
    });
  };

  const removeFavorite = () => {
    fetch(`https://myflixapi-3voc.onrender.com/users/${user.Username}/movies/${movie.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${storedToken}`
      }
    }).then((response) => {
      if(response.ok) {
        return response.json();
      } else {
        alert("Unable to remove movie from favorites")
      }
    }).then((user) => {
      if(user) {
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        setIsFavorite(false);
      }
    })
    .catch((error) => {
      alert(error);
    });
  }; 

  return (
    <Card className="movie-card h-100">
      <Card.Img variant="top" src={movie.imagePath} className="h-100" />
      <Card.Body>
        <Card.Title className="card-title text-center">{movie.title}</Card.Title>
        <div className="d-flex justify-content-between">
          <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
            <Button variant="primary" className="open-button">Open</Button>
          </Link>
          {!isFavorite ? (
            <Button
              variant="link"
              className="favorite-button"
              onClick={addFavorite}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                fill="red"
                viewBox="0 0 16 16"
              >
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
              </svg>
            </Button>
          ) : (
            <Button
              variant="link"
              className="favorite-button"
              onClick={removeFavorite}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                fill="red"
                viewBox="0 0 16 16"
              >
                <path
                    fillRule="evenodd"
                    d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                />
              </svg>
            </Button>
          )}
        </div>
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