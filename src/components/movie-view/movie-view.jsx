import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m.id === movieId);

  return (
    <Row className="justify-content-center">
      <Col className="mt-3" lg={6} md={8} xs={9}>
        <img 
          src={movie.imagePath} 
          alt="poster of the movie selected" 
          className="w-100 mb-3" 
        />
      </Col>
      <Col className="mt-lg-3 mt-md-1" lg={6} md={8} xs={9}>
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
        <Link to={`/`}>
          <Button className="back-button mt-3 w-25">Back</Button>
      </Link>
      </Col>
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
