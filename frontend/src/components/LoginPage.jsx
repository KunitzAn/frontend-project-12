import { Formik } from 'formik';
import {Form, Button, Col, Row, Card, Container, Stack, FloatingLabel} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Yup from 'yup';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/index.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';
import routes from '../routes.js';
import React, { useState } from 'react';


const FormContainer = ({ children }) => (
  <Container fluid className="h-100">
    <Row className="justify-content-center align-content-center h-100">
      <Col xs="12" md="8" xxl="6">
        <Card>
          <Card.Body className="p-5">
            <Row>
              <Col className="d-flex align-items-center justify-content-center">
              </Col>
              <Col>
                {children}
              </Col>
            </Row>
          </Card.Body>
          <Card.Footer className="p-4">
            <div className="text-center">
              <span>{('Don\'t have an account? ')}</span>
            </div>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  </Container>
);

const validationSchema = Yup.object().shape({
  username: Yup.string().trim()
    .min(3, 'From 3 to 20 characters')
    .max(20, 'From 3 to 20 characters')
    .required('Required field'),
  password: Yup.string().trim()
    .required('Required field'),
});

const useSubmit = (setAuthFailed) => {
  const auth = useAuth();
  const navigate = useNavigate();

  return async (values) => { 
    setAuthFailed(false);
    try {
      const res = await axios.post(routes.loginApiPath(), values);
      auth.userLogIn(res.data);
      navigate(routes.chatPagePath());
    } catch (err) {
      if (!err.isAxiosError) throw err;
      console.error(err);
      if (err.response?.status === 401) setAuthFailed(true);
      else toast.error(('Connection error'));
    } finally {
    }
  };

};


const LoginPage = () => {

  const [authFailed, setAuthFailed] = useState(false);

  const formik = Formik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: useSubmit(setAuthFailed),
  });


    return (
      <FormContainer>
        <Form onSubmit={formik.handleSubmit}>
        <h1 className="text-center mb-4">{('Login')}</h1>
        <fieldset>
          <Stack>

            <FloatingLabel controlId="floatingUsername" label={('Your nickname')} className="position-relative">
              <Form.Control
                onChange={formik.handleChange}
                value={formik.username}
                placeholder={('Your nickname')}
                name="username"
                autoComplete="username"

                isInvalid={authFailed }
              />
                {authFailed && (
                <Form.Control.Feedback type="invalid" tooltip className="position-absolute top-0 start-100">
                  {('Invalid username or password')}
                </Form.Control.Feedback>
              )}
            </FloatingLabel>

            <FloatingLabel controlId="floatingPassword" label={('Password')}>
              <Form.Control
                onChange={formik.handleChange}
                type="password"
                value={formik.password}
                placeholder={('Password')}
                name="password"
                autoComplete="current-password"
                
              />

            </FloatingLabel>

            
            <Button type="submit" variant="outline-primary">{('Login')}</Button>

          </Stack>
        </fieldset>
        </Form>
      </FormContainer>
    );
};
  
export default LoginPage;
