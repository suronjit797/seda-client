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
import EditInstaller from './Pages/Installer/EditInstaller';
import Settings from './Pages/Settings/Settings';
import BuildingBackgroundTypes from './Pages/Settings/BuildingBackgroundTypes';
import EditAdmin from './Pages/Admins/EditAdmin';
import AdminView from './Pages/Admins/AdminView';
import Admins from './Pages/Admins/Admins';
import AddAdmin from './Pages/Admins/AddAdmin';
import SiteLocations from './Pages/SiteLocation/SiteLocations';
import AddSiteLocation from './Pages/SiteLocation/AddSiteLocation';
import SiteLocationView from './Pages/SiteLocation/SiteLocationView';
import EditSiteLocation from './Pages/SiteLocation/EditSiteLocation';
import SiteDocuments from './Pages/SiteLocation/SiteDocuments';
import "react-awesome-lightbox/build/style.css";
import ForgotPassword from './Pages/SignIn/ForgotPassword';

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
              {/* Installer related routes */}
              <Route path="/installers" element={<Installers />} />
              <Route path="/add-installer" element={<AddInstaller />} />
              <Route path="/installer/:installerId" element={<InstallerView />} />
              <Route path="/edit-installer/:installerId" element={<EditInstaller />} />

              {/* site admin related routes */}
              <Route path="/admins" element={<Admins />} />
              <Route path="/add-admins" element={<AddAdmin />} />
              <Route path="/admin/:adminId" element={<AdminView />} />
              <Route path="/edit-admin/:adminId" element={<EditAdmin />} />

              {/* site Location related routes */}
              <Route path="/site-locations" element={<SiteLocations />} />
              <Route path="/add-location" element={<AddSiteLocation />} />
              <Route path="/site-location/:siteLocationId" element={<SiteLocationView />} />
              <Route path="/edit-site-location/:siteLocationId" element={<EditSiteLocation />} />
              <Route path="/site-document/:siteLocationId" element={<SiteDocuments />} />

              {/* settings */}
              <Route path="/settings" element={<Settings />} />
              <Route path="/building-background-types" element={<BuildingBackgroundTypes />} />
            </Routes>
            <Footer />
          </>
          :
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path='/forgot-password' element={<ForgotPassword/>}/>
          </Routes>
        }
      </div>
    </BrowserRouter>
  );
}

export default App;
