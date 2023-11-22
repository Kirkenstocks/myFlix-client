import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
// import "./main-view.scss";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);


  //importing data from API
  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://myflixapi-3voc.onrender.com/movies", {
      headers: { Authorization: `Bearer ${token}`}
    })
      .then((response) => response.json())
        .then((data) => {
          const moviesFromApi = data.map((movie) => {
            return {
              title: movie.Title,
              releaseYear: movie.ReleaseYear,
              description: movie.Description,
              genre:
              {
                Name: movie.Genre.Name,
                Description: movie.Genre.Description
              },
              director: {
                Name: movie.Director.Name,
                Bio: movie.Director.Bio,
                Birth: movie.Director.Birth,
                Death: movie.Director.Death
              },
              imagePath: movie.ImagePath,
              featured: movie.Featured,
              id: movie._id
            };
          });
          setMovies(moviesFromApi);
        });
  },[token]);

  //display on page
  return (
    <Row className="justify-content-sm-center">
      {!user ? (
        <Col md={6}>
          <LoginView 
            onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }}
          />
          Login above, or sign up below
          <SignupView />
        </Col>
      ) : selectedMovie ? (
        <Col sm={8}>
          <MovieView
          movie={selectedMovie}
          onBackClick={() => setSelectedMovie(null)}
          />
        </Col>
      ) : movies.length === 0 ? (
        <div>The list is empty!</div>
      ) : (
        <>
          {movies.map((movie) => (
            <Col className="mb-5" key={movie.id} md={3}>
              <MovieCard
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie)
                }}
             />
            </Col>  
          ))}
          <Button className="logout-button w-25"
          onClick={() => { 
          setUser(null);
          setToken(null);
          localStorage.clear();
          }}>Logout</Button>
        </>
      )}
    </Row>
  );
};