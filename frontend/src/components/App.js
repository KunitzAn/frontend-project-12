import '../App.css';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import LoginPage from './LoginPage';
import NotFoundPage from './NotFoundPage';
import ChatPage from './ChatPage';

import React, { useState, useMemo } from 'react';
import { useAuth } from '../hooks/index.jsx';
import routes from '../routes';
import {Container, Navbar, Button} from 'react-bootstrap';
import { AuthContext } from '../hooks/index.jsx';

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    const item = localStorage.getItem('userData');
    return item ? JSON.parse(item) : null;
  });
  const userLogIn = (data) => {
    setUserData(data);
    const stringedData = JSON.stringify(data);
    localStorage.setItem('userData', stringedData);
  };
  const userLogOut = () => {
    setUserData(null);
    localStorage.removeItem('userData');
  };
  const auth = useMemo(() => ({ userData, userLogIn, userLogOut }), [userData]);


  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  return auth.userData ? children : <Navigate to={routes.loginPagePath()} />;
};
const AuthButton = () => {
  const auth = useAuth();
  return auth.userData && <Button onClick={auth.userLogOut}>{('Logout')}</Button>;
};

const App = () => (

  <AuthProvider>
    <Router>
      <div className="d-flex flex-column vh-100">

      <Navbar className="shadow-sm navbar-expand-lg navbar-light bg-white">
          <Container>
            <Navbar.Brand as={Link} to={routes.chatPagePath()}>Hexlet Chat</Navbar.Brand>
            <AuthButton />
          </Container>
        </Navbar>
        
        
        <Routes>

        <Route path={routes.loginPagePath()} element={<LoginPage />} />
          <Route
            path={routes.chatPagePath()}
            element={(
              <PrivateRoute>
                <ChatPage />
              </PrivateRoute>
            )}
        />
        <Route path="*" element={<NotFoundPage />} />

        </Routes>
      </div>
    </Router>
  </AuthProvider>

);

export default App;


/*
          <Route path="/" element={<ChatPage/> } />
          <Route path="login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
*/