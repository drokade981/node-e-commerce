import Nav from './components/Nav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Footer from './components/Footer';
import Signup from './components/Signup';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import UpdateProductC from './components/UpdateProductComponent';
import ProductList from './components/ProductList';

function App() {
  return (
    <div className="App">
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    <BrowserRouter>
      <Nav />
      <Routes>
        
        <Route element={<PrivateComponent />}>
        <Route path="/products" element= {<ProductList />} />
        <Route path="/add-product" element= {<AddProduct />} />
        <Route path="/update-product/:id" element= {<UpdateProductC />} />
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
