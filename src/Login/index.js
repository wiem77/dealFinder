import {
  Box,
  Button,
  TextField,
  Backdrop,
  CircularProgress,
} from '@mui/material';

import { Formik } from 'formik';
import * as yup from 'yup';
import { Input } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../components/Header';
import { Add } from '@mui/icons-material';
import React, { useState, useEffect, useContext } from 'react';

import { baseUrl } from '../config/config';
import axios from 'axios';
import { login } from '../util/auth';
import { AuthContext } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
const checkoutSchema = yup.object().shape({
  email: yup.string().required('required'),
  password: yup.string().required('required'),
});
export const Login = () => {
  const navigate = useNavigate();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);
  const isNonMobile = useMediaQuery('(min-width:600px)');
  const initialValues = {
    email: '',
    password: '',
  };

  const handleFormSubmit = async (values) => {
    setIsAuthenticating(true);
    try {
      const email = values.email;
      const password = values.password;

      const { token, user } = await login({ email, password });
      authCtx.authenticate({ token, user });
      console.log('Sign in successful');
      navigate('/');
    } catch (error) {
      console.error(error);
      window.alert(`Error: ${error.response.data.message}`);
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100%"
    >
      <Box>
        <Header
          title="DealFinder Dashbord"
          subtitle="Bon Retour parmi nous veuillez vous connecter"
        />

        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box m="20px" alignItems="center">
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    '& > div': {
                      gridColumn: isNonMobile ? undefined : 'span 4',
                    },
                  }}
                >
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={!!touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                    sx={{ gridColumn: 'span 4' }}
                  />

                  <TextField
                    fullWidth
                    variant="filled"
                    type="password"
                    label="Mot de passe"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    name="password"
                    error={!!touched.password && !!errors.password}
                    helperText={touched.password && errors.password}
                    sx={{ gridColumn: 'span 4' }}
                  />
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                    Se Connecter
                  </Button>
                </Box>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};
