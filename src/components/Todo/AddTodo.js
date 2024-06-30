import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TodoContext } from '../../context/TodoContext';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
`;

const AddTodo = () => {
  const [formData, setFormData] = useState({ title: '', description: '', due_date: '' });
  const { addTodo } = useContext(TodoContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addTodo(formData);
    navigate('/todos');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input type="text" name="title" placeholder="Title" onChange={handleChange} required />
      <Input type="text" name="description" placeholder="Description" onChange={handleChange} required />
      <Input type="date" name="due_date" onChange={handleChange} required />
      <Button type="submit">Add Todo</Button>
    </Form>
  );
};

export default AddTodo;
