import React, { useState, useEffect } from 'react'
import { Link, redirect, useNavigate } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { LinkContainer } from 'react-router-bootstrap'
import { listUsers, deleteUser } from '../actions/userActions'
import { listOrders } from '../actions/orderActions'


function OrderListScreen() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const orderList = useSelector(state => state.orderList)
    const { loading, error, orders } = orderList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(listOrders())
        }else{
            navigate('/login')
        }
    }, [dispatch, userInfo])

    // const deleteHandler = (id) =>{
    //     // console.log('Delete: ',id);
    //     if(window.confirm('Are you sure you want to delete this user?')){
    //         dispatch(deleteUser(id))
    //     }
    // }

    return (
        <div>
            <h1>Users</h1>
            {loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                    : (
                        <Table striped boarded hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>USER</th>
                                    <th>DATE</th>
                                    <th>TOTAL</th>
                                    <th>PAID</th>
                                    <th>DELIVERED</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.user && order.user.name}</td>
                                        <td>{order.createdAt.substring(0,10)}</td>
                                        <td>${order.totalPrice}</td>
                                        <td>
                                            {order.isPaid ? (
                                                // <i className='fas fa-check' style={{ 'color': 'green' }}></i>
                                                order.paidAt.substring(0,10)
                                            ) : (
                                                <i className='fas fa-x' style={{ 'color': 'red' }}></i>
                                            )
                                            }
                                        </td>

                                        <td>
                                            {order.isDelivered ? (
                                                // <i className='fas fa-check' style={{ 'color': 'green' }}></i>
                                                order.deliveredAt.substring(0,10)
                                            ) : (
                                                <i className='fas fa-x' style={{ 'color': 'red' }}></i>
                                            )
                                            }
                                        </td>

                                        <td>
                                            <LinkContainer to={`/order/${order._id}`}>
                                                <Button variant='light' className='btn-sm'>
                                                    {/* <i className='fas fa-edit'></i> */}
                                                    Details
                                                </Button>
                                            </LinkContainer>

                                            {/* <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(user._id)}>
                                                <i className='fas fa-trash'></i>
                                            </Button> */}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
        </div>
    )
}

export default OrderListScreen