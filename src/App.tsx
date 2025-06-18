import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DarkModeProvider } from './components/darkmode';
import LandingPage from './pages/home';
import './styles/style.css'
import Login from './pages/logon';
import SignUp from './pages/Signup';
import MainPage from './pages/reoirtGenerate';

function App() {
  return (
    <DarkModeProvider>
      <BrowserRouter>
        <Routes location={"/get-started"}>
            <Route path='/home' element={<LandingPage/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path="/sign-up" element={<SignUp/>}/>
            <Route path='/get-started' element={<MainPage/>}/>
        </Routes>
      </BrowserRouter>
      
    </DarkModeProvider>
  );
}

export default App;
