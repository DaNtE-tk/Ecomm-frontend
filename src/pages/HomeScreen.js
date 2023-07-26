import React, {useState, useEffect} from 'react'
import {Row, Col} from 'react-bootstrap'
// import products from '../products'
import Product from '../components/Product';
import axios from 'axios';

function HomeScreen() {
  const [products,setProducts] = useState([]);
  useEffect(()=>{
    // console.log('Use Effect triggered!')
    async function fetchProducts(){
      const {data} = await axios.get('/api/products/')
      // console.log(data)
      setProducts(data)
    }
    fetchProducts()
  }, [])
  return (
    <div>
        <h1>My E-Comm App!❤</h1>
        <hr style={{"marginBottom":"50px"}}/>
        <h2>Latest Products</h2>
        <Row>
            {products.map(product => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product}/>
                </Col>
            ))}
        </Row>
    </div>
  )
}

export default HomeScreen