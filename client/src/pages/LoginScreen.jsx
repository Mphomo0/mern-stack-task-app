import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { useLoginMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login, { isLoading }] = useLoginMutation()

    const { userInfo } = useSelector((state) => state.auth);
    
    useEffect(() => {
        // Redirect to the '/todos' page if the user is already logged in.
        if(userInfo) {
            navigate('/todos/')
        }
    }, [navigate, userInfo])

    // Function to handle form submission.
    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            // Send a login request and unwrap the result using 'unwrap'.
            const res = await login({email, password}).unwrap()
            // Dispatch the user credentials and navigate to the '/todos' page.
            dispatch(setCredentials({...res}))
            navigate('/todos/')
        } catch (err) {
            // Display an error message based on the response data or the error itself.
            toast.error(err?.data?.message || err.error)
        }
    }

    return (
        <FormContainer>
            <h1>Sign In</h1>

            <Form onSubmit={submitHandler}>
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
                { isLoading && <Loader />} {/* Display a loader when 'isLoading' is true. */}
                <Button type='submit' variant='primary' className='mt-3'>Sign In</Button>
                <Row className='py-3'>
                    <Col>
                        New Customer? <Link to='/register'>Register</Link>
                    </Col>
                </Row>
            </Form>
        </FormContainer>
    )
}

export default LoginScreen;
