import { Container, Row, Col } from 'react-bootstrap';

// Define a functional React component called FormContainer, which takes a prop named 'children'.
const FormContainer = ({ children }) => {
  return (
    // Use the Container component from react-bootstrap to create a container for the form.
    <Container>
      {/* Create a row within the container, align it to the center and add some top margin. */}
      <Row className='justify-content-md-center mt-5'>
        {/* Create a column within the row that spans 12 columns on extra small screens (xs) and 6 columns on medium screens (md). Add some padding. */}
        <Col xs={12} md={6} className='card p-5'>
          {/* Render the children, which are components passed to FormContainer. */}
          {children}
        </Col>
      </Row>
    </Container>
  );
};

// Export the FormContainer component as the default export of this module.
export default FormContainer;
