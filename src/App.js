import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { EarningsWidget } from './components/EarningsWidget';
import { WIDGET_LOGO, WIDGET_TITLE } from './constants';
import WidgetPage from './pages/WidgetPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Main application page */}
        <Route path="/" element={
          <div className="bg-[#dcb482] h-full overflow-y-auto p-4">
            <EarningsWidget title={WIDGET_TITLE} logo={WIDGET_LOGO} daysToShow={5} />
          </div>
        } />
        
        {/* Standalone widget page for iframe embedding */}
        <Route path="/widget" element={<WidgetPage />} />
      </Routes>
    </Router>
  );
}

export default App;
