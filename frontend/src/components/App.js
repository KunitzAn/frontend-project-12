import '../App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
import NotFoundPage from './NotFoundPage';
import ChatPage from './ChatPage';

const App = () => (
    <Router>
        <Routes>
          <Route path="/" element={<ChatPage/> } />
          <Route path="login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
    </Router>

);

export default App;
