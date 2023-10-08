import React, {useEffect} from 'react'
import {Link, useParams, useSearchParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Row, Col, ListGroup, Image, Form, Button, Card} from 'react-bootstrap'
import {Message} from '../components/Message'
import {addToCart} from '../actions/carActions'

function CartScreen({match,location,history}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const {productId} = useParams()
  // const productId = searchParams.get("id");
  const qty = searchParams.get("qty") || 1;
  console.log('id: ',productId);
  console.log('qty: ', qty);

  const dispatch = useDispatch();

  const cart = useSelector(state => state.cart)
  const {cartItems} = cart
  console.log('cart items:', cartItems);

  useEffect(()=>{
    if(productId){
      dispatch(addToCart(productId,qty));
    }
  },[dispatch,productId,qty])

  return (
    <div>
      CART
    </div>
  )
}

export default CartScreen
