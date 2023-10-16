import { Outlet } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from "./components/Header"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <Header /> {/* Render the Header component at the top of the app. */}
      <ToastContainer /> {/* Render the ToastContainer for displaying toast messages. */}
      <Container className='my-2'>
        <Outlet /> {/* Render the child components defined in the routes using the Outlet. */}
      </Container>
    </>
  )
}

export default App
