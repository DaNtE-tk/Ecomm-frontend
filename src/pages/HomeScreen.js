import React, {useState, useEffect} from 'react'
import {Row, Col} from 'react-bootstrap'
// import products from '../products'
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
// import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {listProdcts} from '../actions/productActions'

function HomeScreen() {
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const {error, loading, products} = productList
  useEffect(()=>{
   dispatch(listProdcts())


  }, [dispatch])
  // const products = []

  return (
    <div>
        <h1>My E-Comm App!❤</h1>
        <hr style={{"marginBottom":"50px"}}/>
        <h2>Latest Products</h2>
        {loading ? <Loader />
          : error ? <Message variant='danger'>{error}</Message>
            :
            <Row>
            {products.map(product => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product}/>
                </Col>
            ))}
        </Row> 
        }
    </div>
  )
}

export default HomeScreen