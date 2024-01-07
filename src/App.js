// import logo from './logo.svg'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import {Container} from 'react-bootstrap';
import HomeScreen from './pages/HomeScreen';
import ProductScreen from './pages/ProductScreen';
import LoginScreen from './pages/LoginScreen';
import RegisterScreen from './pages/RegisterScreen';
import CartScreen from './pages/CartScreen';
import ProfileScreen from './pages/ProfileScreen';
import ShippingScreen from './pages/ShippingScreen';
import PaymentScreen from './pages/PaymentScreen';
import PlaceOrderScreen from './pages/PlaceOrderScreen';
import OrderScreen from './pages/OrderScreen';
import UserListScreen from './pages/UserListScreen';
import EditUserScreen from './pages/UserEditScreen';
import ProductListScreen from './pages/ProductListScreen';
import EditProductScreen from './pages/ProductEditScreen';


function App() {
  return (
    <Router>
      <Header/>
        <main className="py-3">
        <Container>
        {/* <h1>My E-Comm App!❤</h1> */}
         {/* <HomeScreen /> */}
         <Routes>
          <Route path='/' element={<HomeScreen/>} exact />
          <Route path='/product/:id' element={<ProductScreen/>} />
          {/* <Route path='/cart/:id?' element={<CartScreen/>} /> */}
          <Route path='/cart'>
            <Route path=':productId' element={<CartScreen/>} />
            <Route index element ={<CartScreen/>} />
          </Route>
          <Route path='/login' element={<LoginScreen/>} />
          <Route path='/register' element={<RegisterScreen/>} />
          <Route path='/profile' element={<ProfileScreen/>} />
          <Route path='/shipping' element={<ShippingScreen/>} />
          <Route path='/payment' element={<PaymentScreen/>} />
          <Route path='/placeorder' element={<PlaceOrderScreen/>} />
          <Route path='/order/:orderId' element={<OrderScreen/>} />
          <Route path='/admin/userlist' element={<UserListScreen/>} />
          <Route path='/admin/user/:userId/edit' element={<EditUserScreen/>} />
          <Route path='/admin/productlist' element={<ProductListScreen/>} />
          <Route path='/admin/product/:productId/edit' element={<EditProductScreen/>} />
         </Routes>
        </Container>
        </main>
      <Footer/>
    </Router>
  );
}

export default App;
