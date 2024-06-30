import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import { TodoContext } from '../../context/TodoContext';
import useCallAPI from '../../hooks/useCallAPI';
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import AddTodoDialog from './AddTodoDialog';
import CustomAlert from '../Layout/CustomAlert';

import IconButton from '@mui/material/IconButton';
import AlignVerticalTopIcon from '@mui/icons-material/AlignVerticalTop';

const TodoList = () => {
  const { todos, setTodos,updateTodo,deleteTodo } = useContext(TodoContext);
  const { callAuthAPI } = useCallAPI();
  const [open, setOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [openCreate, setOpenCreate] = useState(false);
  const [deleteSuccessMessage, setDeleteSuccessMessage] = useState(null);
  const [sortBy, setSortBy] = useState('asc');
  const [isFiltering, setIsFiltering] = useState(false);
  const [statusFilterType, setStatusFilterType] =useState('all');

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await callAuthAPI({ url: '/task', method: 'GET' });
      console.log(response.data);
      setTodos(response.data?.tasks);
    };

    fetchTodos();
    // eslint-disable-next-line
  }, []);

  const handleClickOpen = (todo) => {
    setSelectedTodo(todo);
    setOpen(true);
    console.log();
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTodo(null);

  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setSelectedTodo({
      ...selectedTodo,
      [name]: value,
    });
  };

  const handleClickOpenCreate = () => {
    setOpenCreate(true);
  };

  const handleCloseCreate = () => {
    setOpenCreate(false);
  };

  const handleSave = async () => {
    updateTodo(selectedTodo.id,selectedTodo)
      handleClose();
  };

  const handleDelete = async (todo) => {
    deleteTodo(todo);
    setDeleteSuccessMessage('Task Deleted Successfully');
  };


  const handleSort = async (type) => {
    if(!isFiltering){
      setIsFiltering(true);

      const response = await callAuthAPI({ url: `/task?sort_by=${type}&sort_type=${sortBy}`, method: 'GET' });
      setSortBy(sortBy === 'asc' ? 'desc' : 'asc');
      
      setTodos(response.data?.tasks);
    
      setIsFiltering(false);
  }
  };

  const handleStatusFilter = async (e) => {
    const { value } = e.target;
    let placeholder ;
    if(!isFiltering){
      if(value !== "all"){
        placeholder = 'status='+value;
      } 
      const  response = await callAuthAPI({ url: `/task?${placeholder}`, method: 'GET' });
      setTodos(response.data?.tasks);
      setIsFiltering(false);
      setStatusFilterType(value);
    }
  };

  return (
    <Container  maxWidth="xl"  sx={{ width:'100%',marginTop: '80px' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Tasks List
      </Typography>
      <Button
        variant="contained"
        color="primary"
       onClick={handleClickOpenCreate}
        
        sx={{ marginBottom: '20px' }}
      >
        Add Task
      </Button>
      <TableContainer component={Paper} sx={{ minWidth: 850 }}  >
        <Table >
          <TableHead>
            <TableRow>
              <TableCell>S.N.</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>
                Status
              <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
              <Select
                  value={statusFilterType}
                  onChange={handleStatusFilter}
                  label="Status"
                  name="status"
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                  <MenuItem value="incompleted">Incomplete</MenuItem>
                </Select>
            </FormControl>
            {/* <IconButton onClick={()=>handleSort('status')} aria-label="sort" size="small"> */}
            {/* <AlignVerticalTopIcon fontSize="inherit" /> */}
          {/* </IconButton> */}

              </TableCell>
              <TableCell>Due Date 
              <IconButton onClick={()=>handleSort('due_date')} aria-label="sort" size="small">
            <AlignVerticalTopIcon fontSize="inherit" />
          </IconButton>
              </TableCell>
              <TableCell>Created At
              <IconButton onClick={()=>handleSort('created_datetime')} aria-label="sort" size="small">
            <AlignVerticalTopIcon fontSize="inherit" />
          </IconButton>

                </TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todos.map((todo,i) => (
              <TableRow key={todo.id}>
                <TableCell>{i+1}</TableCell>
                <TableCell>{todo.title}</TableCell>
                <TableCell>{todo.description}</TableCell>
                <TableCell>{todo.status}</TableCell>

                <TableCell>
                {moment(new Date(todo.due_date)).format('MMMM Do YYYY')}
                </TableCell>
                <TableCell>{moment(new Date(todo.created_datetime)).format('MMMM Do YYYY, h:mm:ss a')}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleClickOpen(todo)}
                    sx={{ marginRight: '10px' }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={()=>handleDelete(todo)}
                    // Add your delete handler here
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Task</DialogTitle>
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
                value={moment(new Date(selectedTodo.due_date)).format('YYYY-MM-DD')}
                onChange={handleEditChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
                <InputLabel>Status</InputLabel>
                <Select
                  value={selectedTodo.status}
                  onChange={handleEditChange}
                  label="Status"
                  name="status"
                >
                  <MenuItem value="completed">Completed</MenuItem>
                  <MenuItem value="incompleted">Incomplete</MenuItem>
                </Select>
              </FormControl>
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

      <AddTodoDialog open={openCreate} onClose={handleCloseCreate} />
      <CustomAlert message={deleteSuccessMessage} isError={false} handleClose={()=>{setDeleteSuccessMessage(null)}} />

    </Container>
  );
};

export default TodoList;
