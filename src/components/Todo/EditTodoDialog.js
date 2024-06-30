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

const AddTodoDialog = ({ open, onClose ,selectedTodo,setSelectedTodo}) => {
  const { addTodo } = useContext(TodoContext);
  const [newTodo, setNewTodo] = useState({ title: '', description: '', due_date: '' });
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
    setNewTodo({ title: '', description: '', due_date: '' });
    setSuccessMessage('Task Created Successfully');
  };

  const handleClose = () => {
    // setOpen(false);
    // setSelectedTodo(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setSelectedTodo({
      ...selectedTodo,
      [name]: value,
    });
  };

  const handleSave = async () => {
    
    // updateTodo(selectedTodo.id,selectedTodo)
      handleClose();
  };

  return (
    <>
    
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Todo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Make changes to the todo item and save.
          </DialogContentText>
          {selectedTodo && (
            <>
              <TextField
                autoFocus
                margin="dense"
                name="title"
                label="Title"
                type="text"
                fullWidth
                variant="outlined"
                value={selectedTodo.title}
                onChange={handleEditChange}
              />
              <TextField
                margin="dense"
                name="description"
                label="Description"
                type="text"
                fullWidth
                variant="outlined"
                value={selectedTodo.description}
                onChange={handleEditChange}
              />
              <TextField
                margin="dense"
                name="due_date"
                label="Due Date"
                type="date"
                fullWidth
                variant="outlined"
                value={selectedTodo.due_date}
                onChange={handleEditChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      {/* <CustomAlert message={successMessage} isError={false} handleClose={()=>{setSuccessMessage(null)}} /> */}
    </>
    
  );
};

export default AddTodoDialog;
