import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Setup from './pages/Setup';


function App() {
  return (
    <div className="App">
      <div>
        <Navbar />
      </div>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/first-time-setup' element={<Setup />} />
        <Route path='/login' element={<Login />} />

      </Routes>

      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
