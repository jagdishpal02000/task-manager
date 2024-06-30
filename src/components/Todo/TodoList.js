import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TodoContext } from '../../context/TodoContext';
import TodoItem from './TodoItem';
import styled from 'styled-components';
import useCallAPI from '../../hooks/useCallAPI';

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const AddButton = styled(Link)`
  padding: 10px;
  background-color: #28a745;
  color: white;
  text-decoration: none;
  display: inline-block;
  margin-bottom: 20px;
`;


const TodoList = () => {
  const { todos,setTodos } = useContext(TodoContext);
  const {callAuthAPI} = useCallAPI();
  useEffect(()=>{
    const fetchTodos = async () => {
      const response = await callAuthAPI({url:'/task', method: 'GET'});
      console.log(response.data)
      setTodos(response.data?.tasks);
    };

    fetchTodos();
  },[]);

  return (
    <Container>
      <Title>Todo List</Title>
      <AddButton to="/add-todo">Add Todo</AddButton>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </Container>
  );
};

export default TodoList;
