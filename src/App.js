import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import ProductList from './components/productList';

function App() {
  
  return (
    <div className="App">
          <Router>
            <Routes>
              <Route path='/' element={<ProductList/>}/>
            </Routes>
          </Router>
        </div>
  );
}

export default App;
