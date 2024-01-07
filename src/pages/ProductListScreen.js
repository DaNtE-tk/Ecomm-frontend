import React, { useState, useEffect } from 'react'
import { Link, redirect, useNavigate } from 'react-router-dom'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { LinkContainer } from 'react-router-bootstrap'
// import { listUsers, deleteUser } from '../actions/userActions'
import {listProducts, deleteProduct} from '../actions/productActions'

function ProductListScreen() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productList = useSelector(state => state.productList)
    const {error, loading, products} = productList

    const productDelete = useSelector(state => state.productDelete)
    const {success:successDelete} = productDelete

    console.log(products); 
    // const userDelete = useSelector(state => state.userDelete)
    // const { success:successDelete } = userDelete

    useEffect(() => {
        if( userInfo && userInfo.isAdmin){
            // navigate('/login')
           dispatch(listProducts())
        }else{
            navigate('/login')
            // dispatch(listProdcts())
        }
    }, [dispatch, userInfo, successDelete])

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
            {loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                    : (
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
                    )}
        </div>
    )
}

export default ProductListScreen