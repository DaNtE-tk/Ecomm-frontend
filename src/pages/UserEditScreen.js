import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { getUserDetails, updateUser} from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'



function EditUserScreen() {

    const { userId } = useParams('')

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = userUpdate

    useEffect(() => {
        if (successUpdate) {
            dispatch({type: USER_UPDATE_RESET})
            navigate(`/admin/userlist`)
        } else {
            if (!user.name || user._id !== Number(userId)) {
                dispatch(getUserDetails(userId))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
    }, [user, userId, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({_id: user._id,name,email,isAdmin}))
        console.log('triggered')
    }

    return (
        <div>
            <Link to='/admin/userlist' className="btn btn-light my-3">
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit User</h1>
                {/* {message && <Message variant='danger'>{message}</Message>} */}
                {loading && <Loader />}
                {error && <Message variant='danger'>{error}</Message>}
                
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{error}</Message>}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            // required
                            type='name'
                            placeholder='Enter Name'
                            value={name} onChange={(e) => setName(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    <br />
                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            // required
                            type='email'
                            placeholder='Enter Email'
                            value={email} onChange={(e) => setEmail(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    <br />
                    <Form.Group controlId='isAdmin'>
                        <Form.Label>Password</Form.Label>
                        <Form.Check
                            // required
                            type='checkbox'
                            label='Is Admin'
                            checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)}
                        >
                        </Form.Check>
                    </Form.Group>
                    <br />


                    <Button
                        type='submit'
                        variant='primary'
                    >
                        Update
                    </Button>
                </Form>
                {/* <Row className='py-3'>
                <Col>
                    Have and account ? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Sign In</Link>
                </Col>
            </Row> */}
            </FormContainer>
        </div>
    )
}

export default EditUserScreen