import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { Container, TextField, Button, Typography, Paper, Box } from '@mui/material';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, formData);
      navigate('/login');
    } catch (error) {
      console.log(error);
      alert('Signup failed');
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/todos');
    }
  }, [isAuthenticated, navigate]);

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
        <Paper elevation={3} style={{ padding: '40px', width: '100%' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Signup for Task Manager
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="column" gap="20px">
              <TextField 
                label="Name" 
                name="name" 
                variant="outlined" 
                onChange={handleChange} 
                required 
                fullWidth 
              />
              <TextField 
                label="Email" 
                name="email" 
                variant="outlined" 
                type="email" 
                onChange={handleChange} 
                required 
                fullWidth 
              />
              <TextField 
                label="Password" 
                name="password" 
                variant="outlined" 
                type="password" 
                onChange={handleChange} 
                required 
                fullWidth 
              />
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Signup
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default Signup;
