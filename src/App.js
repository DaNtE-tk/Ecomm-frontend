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
         </Routes>
        </Container>
        </main>
      <Footer/>
    </Router>
  );
}

export default App;
