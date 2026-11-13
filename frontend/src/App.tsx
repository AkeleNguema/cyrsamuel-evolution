import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Roadmap from './pages/Roadmap';
import BossAudience from './pages/BossAudience';
import CertificateVerify from './pages/CertificateVerify';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/boss" element={<BossAudience />} />
        <Route path="/verify/:token" element={<CertificateVerify />} />
      </Routes>
    </Router>
  );
}

export default App;
