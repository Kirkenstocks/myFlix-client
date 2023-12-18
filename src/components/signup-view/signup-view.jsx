import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "./signup-view.scss";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };

    fetch("https://myflixapi-3voc.onrender.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      if (response.ok) {
        alert("Account created successfully");
        // window.location.assign("http://localhost:1234/login");
        window.location.assign("https://myflix-sw.netlify.app/login");
      } else {
        alert("Signup failed");
      }
    })
    .catch((error) => {
      alert(error);
    });
  };

  return (
    <div>
      <p className="text-center mt-4 mb-5">Welcome to <span className="signup-title text-center">myFlix</span></p>
      <Form onSubmit ={handleSubmit}>
      <Form.Group controlId="formUsername" className="mb-3">
        <Form.Label>Username: </Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          placeholder="Username must only contain letters and numbers"
        />
      </Form.Group>
      
      <Form.Group controlId="formPassword" className="mb-3">
        <Form.Label>Password: </Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength="8"
          required
          placeholder="Password must be at least 8 characters long"
          />
      </Form.Group>

      <Form.Group controlId="formEmail" className="mb-3">
        <Form.Label>Email: </Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter email"
        />
      </Form.Group>

      <Form.Group controlId="formBirthday" className="mb-3">
        <Form.Label>Birthday: </Form.Label> 
        <Form.Control
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
      </Form.Group>
      <div className="d-flex justify-content-between">
        <Button type="submit" className="signup-button" variant="primary">Create Account</Button>
        <Link to="/login">
          <Button variant="link">
            Have an account? Sign in
          </Button>
        </Link>
      </div>
    </Form>
  </div>
  );
};
