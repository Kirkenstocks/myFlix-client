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

