import './App.css';
import Auth from './pages/Auth';
import AzureAuth from './pages/AzureAuth';
import Magasin from './pages/Magasin';
import Dashboard from './pages/Dashboard';
import RechercheCompteur from './pages/RechercheCompteur';
import ChoixBorne from './pages/ChoixBorne';
import Internet from './pages/Internet';
import TotalDevis from './pages/TotalDevis';
import ChoixRDV from './pages/ChoixRDV';
import { Route, Routes } from "react-router-dom";
import RDV from './pages/RDV';
import AdresseComplete from './pages/AdresseComplete';
import RdvConfirme from './pages/RdvConfirme';
import EmplacementBorne from './pages/EmplacementBorne';
import InfoUtilisateur from './pages/InfoUtilisateur';
import MesDevis from './pages/MesDevis';
import ContactForm from './pages/Contact';
import AuthDebug from './components/AuthDebug';



function App() {
  return (
      <>
          <AuthDebug />
          <Routes>
              <Route path="/" element={<Auth />} />
              <Route path="/auth/callback" element={<AzureAuth />} />
              <Route path="/magasin" element={<Magasin />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/rechercheCompteur" element={<RechercheCompteur />} />
              <Route path="/choixBorne" element={<ChoixBorne />} />
              <Route path="/internet" element={<Internet />} />
              <Route path="/totalDevis" element={<TotalDevis />} />
              <Route path="/choixrdv" element={<ChoixRDV />} />
              <Route path="/rdv" element={<RDV />} />
              <Route path="/adressecomplete" element={<AdresseComplete />} />
              <Route path="/rdvConfirme" element={<RdvConfirme />} />
              <Route path="/emplacementBorne" element={<EmplacementBorne />} />
              <Route path="/infoUtilisateur" element={<InfoUtilisateur />} />
              <Route path="/mesDevis" element={<MesDevis />} />
              <Route path="/contactForm" element={<ContactForm />} />
          </Routes>
      </>
  );
}

export default App;
