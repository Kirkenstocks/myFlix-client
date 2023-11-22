import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import "./movie-card.scss";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card 
      onClick={() => onMovieClick(movie)}
      className="movie-card h-100"
    >
      <Card.Img variant="top" src={movie.imagePath} />
      <Card.Body>
        <Card.Title className="card-title">{movie.title}</Card.Title>
        <Card.Text>{movie.description}</Card.Text>
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