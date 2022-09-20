import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './Components/Layout/Header';
import Navbar from './Components/Layout/Navbar';
import Dashboard from './Pages/Dashboard/Dashboard';
import SignIn from './Pages/SignIn/SignIn';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from 'react-redux';
import Installers from './Pages/Installer/Installers';
import Footer from './Components/Layout/Footer';
import AddInstaller from './Pages/Installer/AddInstaller';
import InstallerView from './Pages/Installer/InstallerView';

function App() {
  const isLogged = useSelector((state) => state.user?.isLogged);
  return (
    <BrowserRouter>
      <div className="App">
        {isLogged ?
          <>
            <Header />
            <Navbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/installers" element={<Installers />} />
              <Route path="/add-installer" element={<AddInstaller />} />
              <Route path="/installer/:installerId" element={<InstallerView />} />
            </Routes>
            <Footer/>
          </>
          :
          <Routes>
            <Route path="/" element={<SignIn />} />
          </Routes>
        }
      </div>
    </BrowserRouter>
  );
}

export default App;
