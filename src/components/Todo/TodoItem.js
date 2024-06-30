import React, { useState, useContext } from 'react';
import { TodoContext } from '../../context/TodoContext';
import styled from 'styled-components';

const Container = styled.div`
  padding: 10px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
`;

const Title = styled.h2`
  font-size: 20px;
`;

const Description = styled.p`
  font-size: 16px;
`;

const Date = styled.p`
  font-size: 14px;
  color: gray;
`;

const Button = styled.button`
  padding: 5px 10px;
  margin-right: 10px;
  background-color: ${props => (props.edit ? '#ffc107' : '#007bff')};
  color: white;
  border: none;
  cursor: pointer;
  font-size: 14px;
`;

const Input = styled.input`
  padding: 5px;
  font-size: 14px;
  margin-right: 10px;
`;

const TodoItem = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...todo });
  const { updateTodo,deleteTodo } = useContext(TodoContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = async () => {

    console.log(todo)
    if (isEditing) {
      await updateTodo(todo.id, formData);
    }
    setIsEditing(!isEditing);
  };

  const handleDelete = async () => {
      await deleteTodo(todo);
  };

  return (
    <Container>
      {isEditing ? (
        <>
          <Input type="text" name="title" value={formData.title} onChange={handleChange} />
          <Input type="text" name="description" value={formData.description} onChange={handleChange} />
          <Input type="date" name="due_date" value={formData.due_date} onChange={handleChange} />
          <Button edit onClick={handleEdit}>Save</Button>
        </>
      ) : (
        <>
          <Title>{todo.title}</Title>
          <Description>{todo.description}</Description>
          <Description>Status : {todo.status}</Description>
          <Date>Due Date: {todo.due_date}</Date>
          <Date>Created At: {todo.created_datetime}</Date>
          <Button onClick={handleEdit}>Edit</Button>
          <Button onClick={handleDelete} >Delete</Button>
        </>
      )}
    </Container>
  );
};

export default TodoItem;
