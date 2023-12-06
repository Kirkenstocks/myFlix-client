import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { MovieCard } from "../movie-card/movie-card";
import { DeleteAccountModal } from "../delete-account-modal/delete-account-modal";
import "./profile-view.scss";

export const ProfileView = ( { user, token, setUser, movies, onLoggedOut, handleShow, handleClose } ) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const storedToken = localStorage.getItem("token");

  //allow users to update their account info
  const handleUpdate = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };

    fetch(`https://myflixapi-3voc.onrender.com/users/${user.Username}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${storedToken}`,
        "Content-Type": "application/json"
      }
    }).then((response) => {
      if (response.ok) {
        alert("Profile updated successfully");
      } else {
        alert("Unable to update profile");
      }
    }).then((updatedUser) => {
      if (updatedUser) {
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        window.location.reload();
      }
    });
  };

  //allow users to delete their account
  const handleDelete = (event) => {
    event.preventDefault();

    fetch(`https://myflixapi-3voc.onrender.com/users/${user.Username}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${storedToken}`
      }
    }).then((response) => {
      if (response.ok) {
        {onLoggedOut};
        alert("Account deleted successfully");
        window.location.replace("/signup");
      } else {
        alert("Unable to delete account");
      }
    })
  }

  //get a list of the user's favorite movies
  const favoriteMovies = movies.filter(movie => user.FavoriteMovies.includes(movie.id));
  
 
  return (
    <>
      <Row>
      <Col md={6}>
        <h3 className="my-3 text-center">Account Information</h3>
        
        <Form className="update-info-form p-3" onSubmit={handleUpdate}>
          <Form.Group controlId="formUsername">
            <Form.Label>Username: </Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder={user.Username}
              className="mb-3"
            />
          </Form.Group>
          
          <Form.Group controlId="formPassword">
            <Form.Label>Password: </Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength="8"
              required
              className="mb-3"
              />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email: </Form.Label>
            <Form.Control
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder={user.Email}
              className="mb-3"
            />
          </Form.Group>

          <Form.Group controlId="formBirthday">
            <Form.Label>Birthday: </Form.Label> 
            <Form.Control
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              className="mb-4"
            />
          </Form.Group>
          <div className="d-flex justify-content-between">
            <Button type="submit" onClick={handleUpdate} className="update-profile-button" variant="primary">Update Info</Button>
            <DeleteAccountModal
              handleDelete={handleDelete}
              className="modal-button" 
            />
          </div>
             
        </Form> 
      </Col>
    </Row>
    <Row>
      <h3 className="mt-5 mb-3 text-center">Favorite Movies</h3>
        {favoriteMovies.map((movie) => {
          return (
            <Col key={movie.id} md={4} className="mb-4">
              <MovieCard 
                movie={movie} 
                user={user}
                token={token}
                setUser={setUser}
              />
            </Col>
        )})}
    </Row>
    </>
    
  );
};
