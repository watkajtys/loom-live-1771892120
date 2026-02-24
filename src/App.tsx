import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LegacyApp from './LegacyApp';
import LofiLoom from './components/lofi/LofiLoom';
import PortfolioConstructor from './components/portfolio/PortfolioConstructor';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LofiLoom />} />
        <Route path="/legacy" element={<LegacyApp />} />
        <Route path="/portfolio-constructor" element={<PortfolioConstructor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
