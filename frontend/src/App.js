import Nav from './components/Nav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/products" element= {<h1>Product listing component</h1>} />
        <Route path="/add-product" element= {<h1>Product add component</h1>} />
        <Route path="/profile" element= {<h1>Profile component</h1>} />
        <Route path="/logout" element= {<h1>Logout component</h1>} />
      </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
