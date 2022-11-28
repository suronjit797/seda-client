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
import Users from './Pages/User/Users';
import AdminSites from './Pages/Admins/AdminSites';
import { useFullScreenHandle } from "react-full-screen";
import SiteUsers from './Pages/SiteUsers/SiteUsers';
import AddSiteUser from './Pages/SiteUsers/AddSiteUser';
import SiteUserView from './Pages/SiteUsers/SiteUserView';
import EditSiteUser from './Pages/SiteUsers/EditSiteUser';
import PublicUsers from './Pages/Public/PublicUsers';
import AddPublicUser from './Pages/Public/AddPublicUser';
import PublicUserView from './Pages/Public/PublicUserView';
import EditPublicUser from './Pages/Public/EditPublicUser';
import Devices from './Pages/Devices/Devices';
import AddDevice from './Pages/Devices/AddDevice';
import DeviceView from './Pages/Devices/DeviceView';
import EditDevice from './Pages/Devices/EditDevice';
import DeviceTypes from './Pages/Devices/DeviceTypes';
import ElectricityTariff from './Pages/Settings/ElectricityTariff';
import SystemComputation from './Pages/Settings/SystemComputation';
import DashboardSettings from './Pages/Settings/DashboardSettings';
import AlarmManagement from './Pages/Settings/AlarmManagement';
import Profile from './Pages/Profile/Profile';
import AnalysisReporting from './Pages/AnalysisReporting/AnalysisReporting';
import EditProfile from './Pages/Profile/EditProfile';
import ResetPassword from './Pages/SignIn/ResetPassword';
import Parameters from './Pages/Settings/Parameters/Parameters';
import DeviceData from './Pages/Devices/DeviceData';
import ManageFormulas from './Pages/Settings/Formula/ManageFormulas';
import BuildingBackgroundTypes from './Pages/Settings/BuildingTypes/BuildingBackgroundTypes';
import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-buttons/js/dataTables.buttons.js"
import "datatables.net-buttons/js/buttons.colVis.js"
import "datatables.net-buttons/js/buttons.flash.js"
import "datatables.net-buttons/js/buttons.html5.js"
import "datatables.net-buttons/js/buttons.print.js"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import DeviceComparison from './Pages/AnalysisReporting/DeviceComparison';
import DashboardTwo from './Pages/Dashboard/DashboardTwo';
import DashboardThree from './Pages/Dashboard/DashboardThree';
import DashboardFour from './Pages/Dashboard/DashboardFour';
import InstallerSignUp from './Pages/SignIn/InstallerSignUp';
pdfMake.vfs = pdfFonts.pdfMake.vfs;



function App() {
  const isLogged = useSelector((state) => state.user?.isLogged);
  const userDetails = useSelector(state => state.user?.userDetails)
  const handle = useFullScreenHandle();
  return (
    <BrowserRouter>
      <div className="App">
        {isLogged ?
          <>
            <Header />

            <Navbar handle={handle} />
            <Routes>
            {(() => {
                switch (userDetails?.dashboard) {
                    case 1:
                        return <Route path="/" element={<Dashboard handle={handle} />} />
                    case 2:
                        return <Route path="/" element={<DashboardTwo handle={handle} />} />
                    case 3:
                        return  <Route path="/" element={<DashboardThree handle={handle} />} />
                    case 4:
                        return <Route path="/" element={<DashboardFour handle={handle} />} />
                    default:
                        return <Route path="/" element={<Dashboard handle={handle} />} />
                }
            })
                ()}
              {/* users related routes */}
              <Route path="/users" element={<Users />} />

              {/* Installer related routes */}
              <Route path="/installers" element={<Installers />} />
              <Route path="/add-installer" element={<AddInstaller />} />
              <Route path="/installer/:installerId" element={<InstallerView />} />
              <Route path="/edit-installer/:installerId" element={<EditInstaller />} />

              {/* site admin related routes */}
              <Route path="/admins" element={<Admins />} />
              <Route path="/add-admins" element={<AddAdmin />} />
              <Route path="/admin/:adminId" element={<AdminView />} />
              <Route path="/admin-sites/:adminId" element={<AdminSites />} />
              <Route path="/edit-admin/:adminId" element={<EditAdmin />} />

              {/* site Location related routes */}
              <Route path="/site-locations" element={<SiteLocations />} />
              <Route path="/add-location" element={<AddSiteLocation />} />
              <Route path="/site-location/:siteLocationId" element={<SiteLocationView />} />
              <Route path="/edit-site-location/:siteLocationId" element={<EditSiteLocation />} />
              <Route path="/site-document/:siteLocationId" element={<SiteDocuments />} />

              {/* site user related routes */}
              <Route path="/site-users" element={<SiteUsers />} />
              <Route path="/add-site-user" element={<AddSiteUser />} />
              <Route path="/site-user/:userId" element={<SiteUserView />} />
              <Route path="/edit-site-user/:userId" element={<EditSiteUser />} />

              {/* Public user related routes */}
              <Route path="/public-users" element={<PublicUsers />} />
              <Route path="/add-public-user" element={<AddPublicUser />} />
              <Route path="/public-user/:userId" element={<PublicUserView />} />
              <Route path="/edit-public-user/:userId" element={<EditPublicUser />} />

              {/* Devices related routes */}
              <Route path="/devices" element={<Devices />} />
              <Route path="/add-device" element={<AddDevice />} />
              <Route path="/device-types" element={<DeviceTypes />} />
              <Route path="/device/:deviceId" element={<DeviceView />} />
              <Route path="/edit-device/:deviceId" element={<EditDevice />} />
              <Route path="/device-data/:deviceId" element={<DeviceData />} />
              

              {/* Analysis &Reporting related routes */}
              <Route path="/analysis-reporting" element={<AnalysisReporting />} />
              <Route path="/device-comparison" element={<DeviceComparison />} />
              

              {/* Settings related routes */}
              <Route path="/settings" element={<Settings />} />
              <Route path="/electricity-tariff" element={<ElectricityTariff />} />
              <Route path="/system-computation" element={<SystemComputation />} />
              <Route path="/dashboard-settings" element={<DashboardSettings />} />
              <Route path="/alarm-management" element={<AlarmManagement />} />
              <Route path="/building-background-types" element={<BuildingBackgroundTypes />} />
              <Route path="/parameters" element={<Parameters />} />
              <Route path="/formulas" element={<ManageFormulas />} />

              {/* Profile */}
              <Route path="/profile" element={<Profile />} />
              <Route path="/edit-profile" element={<EditProfile />} />

            </Routes>
            <Footer />

          </>
          :
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/reset-password/:token' element={<ResetPassword />} />
            <Route path='/installer-signup' element={<InstallerSignUp />} />
          </Routes>
        }
      </div>
    </BrowserRouter>
  );
}

export default App;
