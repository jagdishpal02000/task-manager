import React, { useState, useContext,useEffect } from 'react';
import { useNavigate,Link  } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Container, TextField, Button, Box, Typography, Paper } from '@mui/material';
import axios from 'axios';
import CustomAlert from '../Layout/CustomAlert';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    try {
    e.preventDefault();
    const resp = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, formData);
    const refreshToken = resp.data.refresh_token;
    login(refreshToken,resp.data.name);
    navigate('/todos');
    
  } catch (error) {
    console.log(error);
      setError(error.response.data.message);
  }
  };

  const handleClose = () => {
    setError(null);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/todos');
    }
  }, [isAuthenticated, navigate]);

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography component="h1" variant="h5" align="center">
          Login to Task Manager
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
        </Box>
      </Paper>
      {/* <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}   anchorOrigin={{ vertical: 'top', horizontal: 'center' }} >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar> */}
      <CustomAlert message={error} isError={true} handleClose={handleClose} />
      <Button
        component={Link}
        to="/signup"
        fullWidth
        variant="outlined"
        sx={{ mt: 2 }}
      >
        Don't have an account? Sign Up
      </Button>
    </Container>
  );
};

export default Login;
