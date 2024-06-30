import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { TodoProvider } from './context/TodoContext';

ReactDOM.render(
  <AuthProvider>
    <TodoProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </TodoProvider>
  </AuthProvider>,
  document.getElementById('root')
);
