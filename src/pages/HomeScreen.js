import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
// import products from '../products'
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';

import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions'
import { useParams } from 'react-router-dom';

function HomeScreen() {
  const dispatch = useDispatch()

  const productList = useSelector(state => state.productList)
  const { error, loading, products, page, pages } = productList

  let { keyword, pageNumber } = useParams()

  useEffect(() => {
    // dispatch(topProducts())
    dispatch(listProducts(keyword, pageNumber))

  }, [dispatch, keyword, pageNumber])
  // const products = []

  return (
    <div>
      <h1>My E-Comm App!❤</h1>
      <hr style={{ "marginBottom": "50px" }} />
      
      {!keyword && (
        <ProductCarousel />
      )}
      <br/>
      <h2>Latest Products</h2>
      {loading ? <Loader />
        : error ? <Message variant='danger'>{error}</Message>
          :
          <div>
            <Row>
              {products.map(product => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
            <Paginate page={page} pages={pages} keyword={keyword} />
          </div>
      }
    </div>
  )
}

export default HomeScreen