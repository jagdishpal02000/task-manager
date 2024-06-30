import React, { useState, useContext } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button
} from '@mui/material';
import { TodoContext } from '../../context/TodoContext';
import CustomAlert from '../Layout/CustomAlert';

const AddTodoDialog = ({ open, onClose }) => {
  const { addTodo } = useContext(TodoContext);
  const [newTodo, setNewTodo] = useState({ title: '', description: '', due_date: '',status:'incompleted' });
  const [successMessage,setSuccessMessage] = useState();

  const handleCreateChange = (e) => {
    const { name, value } = e.target;
    setNewTodo({
      ...newTodo,
      [name]: value,
    });
  };

  const handleSaveCreate = async () => {
    await addTodo(newTodo);
    onClose();
    setNewTodo({ title: '', description: '', due_date: '',status:'incompleted' });
    setSuccessMessage('Task Created Successfully');
  };

  return (
    <>
    
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create Task</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter details for the new task item.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          name="title"
          label="Title"
          type="text"
          fullWidth
          variant="outlined"
          value={newTodo.title}
          onChange={handleCreateChange}
        />
        <TextField
          margin="dense"
          name="description"
          label="Description"
          type="text"
          fullWidth
          variant="outlined"
          value={newTodo.description}
          onChange={handleCreateChange}
        />
        <TextField
          margin="dense"
          name="due_date"
          label="Due Date"
          type="date"
          fullWidth
          variant="outlined"
          value={newTodo.due_date}
          onChange={handleCreateChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSaveCreate} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
      <CustomAlert message={successMessage} isError={false} handleClose={()=>{setSuccessMessage(null)}} />
    </>
    
  );
};

export default AddTodoDialog;
