import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import TodoList from './components/Todo/TodoList';
// import AddTodo from './components/Todo/AddTodoDialog';
import Header from './components/Layout/Header';
import { AuthContext } from './context/AuthContext';
import styled from 'styled-components';

const AppContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: auto;
`;

const App = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <AppContainer>
      {isAuthenticated && <Header />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {isAuthenticated && (
          <>
            <Route path="/todos" element={<TodoList />} />
          </>
        )}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </AppContainer>
  );
};

export default App;
