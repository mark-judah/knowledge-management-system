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
import ArticlesList from './pages/ArticlesList';
import Folder from './pages/Folder';
import Induction from './pages/Induction';
import Material from './pages/Material';
import ArticleView from './pages/ArticleView';
import ManageDepartments from './pages/ManageDepartments';
import ManageArticles from './pages/ManageArticles';
import ManageInduction from './pages/ManageInduction';
import ManageFaqs from './pages/ManageFaqs';
import ManageCompany from './pages/ManageCompany';


function App() {
 

  return (
    <div className="App font-poppins">
      <div>
        <Navbar />
      </div>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/first-time-setup' element={<Setup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/departments' element={<Departments />} />
        <Route path='/article-editor' element={<ArticleEditor />} />
        <Route path='/articles' element={<ArticlesList />} />
        <Route path='/articles/:slug' element={<ArticleView />} />
        <Route path='/frequently-asked-questions' element={<Faqs />} />
        <Route path="/departments/*" element={<Folder />} />
        <Route path="/induction" element={<Induction />} />
        <Route path="/induction/:material" element={<Material />} />
        <Route path="/manage-company" element={<ManageCompany />} />
        <Route path="/manage-departments" element={<ManageDepartments />} />
        <Route path="/manage-articles" element={<ManageArticles />} />
        <Route path="/manage-induction" element={<ManageInduction />} />
        <Route path="/manage-faqs" element={<ManageFaqs />} />


      </Routes>

      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
