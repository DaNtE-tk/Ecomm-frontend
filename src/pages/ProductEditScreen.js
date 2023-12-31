import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import {listProductDetails, updateProduct} from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
// import {FormFile} from "react-bootstrap";

function ProductEditScreen() {

    const { productId } = useParams('')

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin

    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} =  productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const {loading: loadingUpdate, error:errorUpdate, success:successUpdate} =  productUpdate

    console.log('success:',successUpdate);

    useEffect(() => {
        if (successUpdate) {
            dispatch({type: PRODUCT_UPDATE_RESET})
            navigate(`/admin/productlist`)
        } else {
            if (!product.name || product._id !== Number(productId)) {
                dispatch(listProductDetails(productId))
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
        }
    }, [product, productId, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        console.log('updating product')
        dispatch(updateProduct({
            _id:productId,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description
        }))
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        
        formData.append('image', file)
        formData.append('product_id', productId)

        setUploading(true)

        console.log('File is uploading...')

        try{
            const config = {
                headers:{
                    'Content-Type':'multipart/form-data',
                    'Authorization' : `Bearer ${userInfo.token}`
                }
            }

            const {data} = await axios.post('/api/products/upload-image/', formData, config)

            setImage(data)
            setUploading(false)

        }catch(error){
            setUploading(false)
        }
    }

    return (
        <div>
            <Link to='/admin/productlist' className="btn btn-light my-3">
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit Product</h1>
                {/* {message && <Message variant='danger'>{message}</Message>} */}
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

                {loading && <Loader />}
                {error && <Message variant='danger'>{error}</Message>}
                

                {/* {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{error}</Message>} */}
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
                    <Form.Group controlId='price'>
                        <Form.Label>Price </Form.Label>
                        <Form.Control
                            // required
                            type='number'
                            placeholder='Enter Price'
                            value={price} onChange={(e) => setPrice(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    <br />
                    <Form.Group controlId='image'>
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            // required
                            type='text'
                            placeholder='Enter Image'
                            value={image} 
                            onChange={(e) => setImage(e.target.value)}
                        >
                        </Form.Control>

                        <Form.File
                            id='image-file'
                            // label='Choose File'
                            custom
                            onChange={uploadFileHandler}
                        >
                        </Form.File>
                        {uploading && <Loader />}
                    </Form.Group>
                    <br />
                    <Form.Group controlId='brand'>
                        <Form.Label>Brand</Form.Label>
                        <Form.Control
                            // required
                            type='text'
                            placeholder='Enter Brand'
                            value={brand} onChange={(e) => setBrand(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    <br />
                    <Form.Group controlId='category'>
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            // required
                            type='text'
                            placeholder='Enter Category'
                            value={category} onChange={(e) => setCategory(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    <br />
                    <Form.Group controlId='countInStock'>
                        <Form.Label>Count In Stock</Form.Label>
                        <Form.Control
                            // required
                            type='number'
                            placeholder='Enter Count In Stock'
                            value={countInStock} onChange={(e) => setCountInStock(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    <br />
                    <Form.Group controlId='description'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            // required
                            type='text'
                            placeholder='Enter Description'
                            value={description} onChange={(e) => setDescription(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    <br />
                    {/* <Form.Group controlId='isAdmin'>
                        <Form.Label>Password</Form.Label>
                        <Form.Check
                            // required
                            type='checkbox'
                            label='Is Admin'
                            checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)}
                        >
                        </Form.Check>
                    </Form.Group>
                    <br /> */}


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

export default ProductEditScreen