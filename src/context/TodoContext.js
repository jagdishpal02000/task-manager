import React, { createContext, useState } from 'react';
import useCallAPI from '../hooks/useCallAPI';

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const {callAuthAPI} = useCallAPI();
 

 

  const addTodo = async (todo) => {
    try {
      
      const response = await callAuthAPI({url:'/task/create', 
        method: 'POST',
        data:todo,
      });
      console.log(response.data.task)
      setTodos([...todos,todo]);

    } catch (error) {
      alert('Something went wrong');
    }
  };
  
  const deleteTodo = async (todo) => {
    try {
      await callAuthAPI({url:`/task/${todo.id}`, method: 'DELETE'});
      setTodos(todos.filter(task => task.id !== todo.id));
    } catch (error) {
      console.log(error);
      alert('Something went wrong');
    }
  };

  const updateTodo = async (id, updatedTodo) => {
    await callAuthAPI({url:`/task/${id}`, method: 'PATCH', data: updatedTodo});
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo))
    );
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, updateTodo,setTodos,deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
};
