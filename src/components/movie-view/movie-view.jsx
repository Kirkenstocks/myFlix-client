import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import "./movie-view.scss";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <Row className="justify-content-center">
      <div>
        <img 
          src={movie.imagePath} 
          alt="poster of the movie selected" 
          className="w-100 mb-3" 
        />
      </div>
        <h4 className="movie-title mb-3">{movie.title}</h4>
      <div>
        <span>Release Year: </span>
        <span>{movie.releaseYear}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.description}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.genre.Name}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.director.Name}</span>
      </div>
      <div>
        <span>Featured: </span>
        <span>{movie.featured.toString()}</span>
      </div>
      <Button onClick={onBackClick} className="back-button mt-3 w-25">Back</Button>
    </Row>
  );
};

//Defining prop-type constraints
MovieView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    releaseYear: PropTypes.string.isRequired,
    genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string
    }).isRequired,
    director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string,
      Birth: PropTypes.string,
      Death: PropTypes.string
    }).isRequired,
    imagePath: PropTypes.string.isRequired,
    featured: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};