import '../App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
import NotFoundPage from './NotFoundPage';

const App = () => (
    <Router>
        <Routes>
          <Route path="/" element={<App/> } />
          <Route path="one" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
    </Router>

);

export default App;
