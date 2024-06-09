import './App.css';
import Home from './components/Home';
import Iframe from './components/Iframe';
import LoginPage from './components/Login'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Signup from './components/Signup';
import { ContextProvider } from './utilities/Context';

function App() {
  return (
    <ContextProvider>
    <Router>
      <Routes>
        <Route exact path = "/" element={<LoginPage/>}/>
        <Route exact path = "/home" element={<Home/>}/>
        <Route exact path = "/iframe" element={<Iframe/>}/>
        <Route exact path = "/signup" element={<Signup/>}/>
      </Routes>
    </Router>
    </ContextProvider>
  );
}

export default App;
