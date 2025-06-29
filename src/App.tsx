import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DarkModeProvider } from './components/darkmode';
import LandingPage from './pages/home';
import './styles/style.css'
import Login from './pages/login';
import SignUp from './pages/Signup';
import LoadEstimation from './pages/LoadEstimation';

function App() {
  return (
    <DarkModeProvider>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<LandingPage/>}/>
            <Route path='/home' element={<LandingPage/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path="/sign-up" element={<SignUp/>}/>
            <Route path='/get-started' element={<LoadEstimation/>}/>
        </Routes>
      </BrowserRouter>
      
    </DarkModeProvider>
  );
}

export default App;
