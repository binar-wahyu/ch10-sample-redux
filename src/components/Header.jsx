import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, userSelector } from "../store/slices/user";

function Header() {
  const { user, loading, error } = useSelector(userSelector);
  const dispatch = useDispatch();

  function jsx_rightSection() {
    if (loading) {
      return <Navbar.Text>Loading user...</Navbar.Text>;
    }

    if (error) {
      return (
        <Navbar.Text>Something went wrong when loading user data</Navbar.Text>
      );
    }

    if (!user) {
      return (
        <Nav>
          <Nav.Link as={NavLink} to="/login">
            Login
          </Nav.Link>

          <Nav.Link as={NavLink} to="/register">
            Register
          </Nav.Link>
        </Nav>
      );
    }

    return (
      <Nav>
        <Navbar.Text>{user.username}</Navbar.Text>
        <Nav.Link onClick={() => dispatch(logout())}>Logout</Nav.Link>
      </Nav>
    );
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">
              Home
            </Nav.Link>

            <Nav.Link as={NavLink} to="/tentang-kami">
              Tentang Kami
            </Nav.Link>

            <Nav.Link as={NavLink} to="/hubungi-kami">
              Hubungi Kami
            </Nav.Link>
          </Nav>

          {jsx_rightSection()}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
