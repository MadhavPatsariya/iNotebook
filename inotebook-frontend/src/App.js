import './App.css';
import Home from './components/Home';
import Iframe from './components/Iframe';
import LoginPage from './components/Login'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route exact path = "/" element={<LoginPage/>}/>
        <Route exact path = "/home" element={<Home/>}/>
        <Route exact path = "/iframe" element={<Iframe/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
