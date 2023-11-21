import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

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
          console.log(data);
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

  if (!user) {
    return (
      <>
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />
        or
        <SignupView />
      </>
    );
  }

  //opens the MovieView for a clicked movie, includes a back button
  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  //displays MovieCards of loaded movies
  return (
    <div>
      {movies.map((movie) => {
        return (
          <MovieCard
            key={movie.id}
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        );
      })}
      <button onClick={() => { 
        setUser(null);
        setToken(null);
        localStorage.clear();
        }}>Logout</button>
    </div>
  );
};