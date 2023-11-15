import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  //importing data from API
  useEffect(() => {
    fetch("https://myflixapi-3voc.onrender.com/movies")
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
  },[]);

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
    </div>
  );
};