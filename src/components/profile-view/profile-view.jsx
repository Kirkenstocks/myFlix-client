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

  //allow users to delete their account - need to add modal
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
  
 
