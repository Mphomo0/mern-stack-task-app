import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    // Get user information from the Redux store
    const { userInfo } = useSelector((state) => state.auth);

    const dispatch = useDispatch(); // Get the Redux dispatch function
    const navigate = useNavigate(); // Get the router's navigation function

    const [logoutApiCall] = useLogoutMutation(); // Use the logout mutation from your API slice

    // Function to handle user logout
    const logoutHandler = async () => {
        try {
            // Call the logout API mutation
            await logoutApiCall().unwrap();

            // Dispatch the logout action to update the Redux store
            dispatch(logout());

            // Navigate the user to the home page
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>Todo App</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            {userInfo ? (
                                // Display navigation options for logged-in users
                                <>
                                    <NavDropdown title={userInfo.name} id="username">
                                        <LinkContainer to="/profile">
                                            <NavDropdown.Item>Profile</NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                    </NavDropdown>
                                </>
                            ) : (
                                // Display navigation options for non-logged-in users
                                <>
                                    <LinkContainer to="/todos">
                                        <Nav.Link>
                                           Todos
                                        </Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to="/login">
                                        <Nav.Link>
                                            <FaSignInAlt /> Sign In
                                        </Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to="/register">
                                        <Nav.Link>
                                            <FaSignOutAlt /> Sign Up
                                        </Nav.Link>
                                    </LinkContainer>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;
