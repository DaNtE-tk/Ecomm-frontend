import React, { useState, useEffect } from 'react'
import { Link, redirect, useNavigate, useParams } from 'react-router-dom'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import { LinkContainer } from 'react-router-bootstrap'
// import { listUsers, deleteUser } from '../actions/userActions'
import {listProducts, deleteProduct, createProduct} from '../actions/productActions'
import {PRODUCT_CREATE_RESET} from '../constants/productConstants'

function ProductListScreen() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    let { keyword, pageNumber } = useParams()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productList = useSelector(state => state.productList)
    const {error, loading, products, page, pages} = productList

    const productDelete = useSelector(state => state.productDelete)
    const {loading:loadingDelete, error:errorDelete, success:successDelete} = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const {loading:loadingCreate, error:errorCreate, success:successCreate, product:createdProduct} = productCreate

    // console.log(products); 
    // const userDelete = useSelector(state => state.userDelete)
    // const { success:successDelete } = userDelete

    useEffect(() => {
        dispatch({type: PRODUCT_CREATE_RESET})

        if(!userInfo.isAdmin){
            navigate('/login')
        //    dispatch(listProducts())
        }
        if(successCreate){
            navigate(`/admin/product/${createdProduct._id}/edit`)
        }else{
            dispatch(listProducts(keyword, pageNumber))
        }
    }, [dispatch, userInfo, successDelete, successCreate, createdProduct, keyword, pageNumber])


    const deleteHandler = (id) =>{
        // console.log('Delete: ',id);
        if(window.confirm('Are you sure you want to delete this product?')){
            // dispatch(deleteUser(id))
            console.log('deleting product');
            dispatch(deleteProduct(id))
        }
    }

    const createProductHandler = () =>{
        console.log('Creating product');
        dispatch(createProduct())
    }

    return (
        <div>
            {/* <h1>Products</h1> */}
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createProductHandler}>
                         <i className='fas fa-plus'></i> Create Product 
                    </Button>
                </Col>
            </Row>
            {loadingDelete && <Loader/>}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

            {loadingCreate && <Loader/>}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

            {loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                    : (
                        <div>
                        <Table striped boarded hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>PRICE</th>
                                    <th>CATEGORY</th>
                                    <th>BRAND</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(product => (
                                    <tr key={product._id}>
                                        <td>{product._id}</td>
                                        <td>{product.name}</td>
                                        <td>${product.price}</td>
                                        <td>{product.category}</td>
                                        <td>{product.brand}</td>
                                        <td>
                                            <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                                <Button variant='light' className='btn-sm'>
                                                    <i className='fas fa-edit'></i>
                                                </Button>
                                            </LinkContainer>

                                            <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id)}>
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <Paginate pages={pages} page={page} isAdmin={true}/>
                        </div>
                    )}
        </div>
    )
}

export default ProductListScreen