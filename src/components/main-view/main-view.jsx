import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Space Jam",
      releaseYear: "1996",
      description:"In a desperate attempt to win a basketball match and earn their freedom, the Looney Tunes seek the aid of retired basketball champion, Michael Jordan.",
      genre: {
        name: "Comedy",
        description: "A comedy film is a category of film which emphasizes on humor. These films are designed to make the audience laugh in amusement.[1] Films in this style traditionally have a happy ending.",
      },
      director: {
        name: "Joe Pytka",
        bio: "Joe Pytka is an American film, television, commercial and music video director born in Pittsburgh, Pennsylvania. He holds the record for the most nominations for the Directors Guild of America Award for Outstanding Directing – Commercials.",
        birth: "1938"
      },
      imagePath: "https://images6.fanpop.com/image/photos/43400000/Space-Jam-1996-Poster-space-jam-43492519-500-750.jpg",
      featured: true
    },
    {
      id: 2,
      title: "White Men Can\'t Jump",
      releaseYear: "1992",
      description:"Black and white basketball hustlers join forces to double their chances of winning money on the street courts and in a basketball tournament.",
      genre: {
        name: "Comedy",
        description: "A comedy film is a category of film which emphasizes on humor. These films are designed to make the audience laugh in amusement.[1] Films in this style traditionally have a happy ending.",
      },
      director: {
        name: "Ron Shelton",
        bio: "Ronald Wayne Shelton is an American film director and screenwriter and former minor league baseball infielder. Shelton is known for the many films he has made about sports.",
        birth: "1945"
      },
      imagePath: "https://is1-ssl.mzstatic.com/image/thumb/Video/v4/3f/5c/c4/3f5cc46e-4ec6-ad4f-de1e-75ef998e920e/source/1200x630bb.jpg",
      featured: true
    },
    {
      id: 3,
      title: "Coach Carter",
      releaseYear: "2005",
      description:"Coach Carter is based on the true story of Richmond High School basketball coach Ken Carter, who made headlines in 1999 for suspending his undefeated high school basketball team due to poor academic results.",
      genre: {
        name: "Drama",
        description: "In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.",
      },
      director: {
        name: "Thomas Carter",
        bio: "Thomas Colbert Carter is an American film and television director, producer and actor.",
        birth: "1953"
      },
      imagePath: "https://tse2.mm.bing.net/th?id=OIP.7azIWacP2aNpCEt-R3JORgDJEs&pid=Api",
      featured: true
    }
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

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