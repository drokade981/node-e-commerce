import Nav from './components/Nav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Signup from './components/Signup';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';
import AddProduct from './components/AddProduct';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Nav />
      <Routes>
        
        <Route element={<PrivateComponent />}>
        <Route path="/products" element= {<h1>Product listing component</h1>} />
        <Route path="/add-product" element= {<AddProduct />} />
        <Route path="/profile" element= {<h1>Profile component</h1>} />
        <Route path="/logout" element= {<h1>Logout component</h1>} />
        </Route>

        <Route path="/register" element= {<Signup />} />
        <Route path="/login" element= {<Login />} />
      </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
