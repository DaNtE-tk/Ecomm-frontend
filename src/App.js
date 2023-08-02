// import logo from './logo.svg';
import Header from './components/Header';
import Footer from './components/Footer';
import {Container} from 'react-bootstrap';
import HomeScreen from './pages/HomeScreen';
import ProductScreen from './pages/ProductScreen';
import CartScreen from './pages/CartScreen';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'


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
          <Route path='/cart/:id?' element={<CartScreen/>} />
         </Routes>
        </Container>
        </main>
      <Footer/>
    </Router>
  );
}

export default App;
