import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../store/slices/user";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function onSubmit(event) {
    event.preventDefault();

    if (loading) return;

    setLoading(true);

    const response = await fetch("http://localhost:4000/auth/register", {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
      }),
    });

    if (response.ok) {
      const data = await response.json();

      await dispatch(login(data.accessToken));

      setLoading(false);

      navigate("/");
    } else {
      const data = await response.json();

      setLoading(false);

      if (data && data.error) {
        if (data.error.code === "auth/user-exists") {
          alert("User sudah ada, silahkan login!");
          navigate("/login");
        }
      }
    }
  }

  return (
    <Container className="mt-3">
      <h1>Register</h1>

      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {loading ? "Loading..." : "Submit"}
        </Button>
      </Form>
    </Container>
  );
}

export default Register;
