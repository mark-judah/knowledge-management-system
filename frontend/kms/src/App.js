import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Setup from './pages/Setup';
import Departments from './pages/Departments';
import ArticleEditor from './pages/ArticleEditor';
import Faqs from './pages/Faqs';
import Articles from './pages/Articles';


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
        <Route path='/departments' element={<Departments />} />
        <Route path='/article-editor' element={<ArticleEditor />} />
        <Route path='/articles' element={<Articles />} />
        <Route path='/frequently-asked-questions' element={<Faqs />} />

      </Routes>

      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;