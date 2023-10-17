import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Row, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'
import { useRegisterMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'

const RegisterScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { userInfo } = useSelector((state) => state.auth);

    const [register, { isLoading }] = useRegisterMutation()

    useEffect(() => {
        // Redirect to the '/todos' page if the user is already logged in.
        if(userInfo) {
            navigate('/todos/list')
        }
    }, [navigate, userInfo])

    // Function to validate if the email address matches a Gmail address format.
    const isEmailValid = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        return emailRegex.test(email);
    };

    // Function to handle the form submission.
    const submitHandler = async (e) => {
        e.preventDefault()
        if(password !== confirmPassword) {
            toast.error('Passwords do not match')
        } else if (!isEmailValid(email)) {
            toast.error('Please enter a valid Gmail email address');
        } else {
            try {
                // Send a registration request and unwrap the result using 'unwrap'.
                const res = await register({name, email, password}).unwrap()
                // Dispatch the user credentials and navigate to the '/todos' page.
                dispatch(setCredentials({...res}))
                navigate('/todos/list')
            } catch (error) {
                // Display an error message based on the response data or the error itself.
                toast.error(error?.data?.message || error.error)
            }
        }
    }
    
    return (
        <FormContainer>
            <h1>Sign Up</h1>

            <Form onSubmit={submitHandler}>
                <Form.Group className='my-2' controlId='name'>
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Your Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group className='my-2' controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group className='my-2' controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group className='my-2' controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Confirm password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                {isLoading && <Loader />} {/* Display a loader when 'isLoading' is true. */}
                <Button type='submit' variant='primary' className='mt-3'>Sign Up</Button>
                <Row className='py-3'>
                    <Col>
                        Already have an account? <Link to='/login'>Login</Link>
                    </Col>
                </Row>
            </Form>
        </FormContainer>
    )
}

export default RegisterScreen;
