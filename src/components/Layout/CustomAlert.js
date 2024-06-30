import {Snackbar,Alert } from '@mui/material';

const CustomAlert = ({isError,message,handleClose}) => {

  return (
      <Snackbar open={message} autoHideDuration={6000} onClose={handleClose}   anchorOrigin={{ vertical: 'top', horizontal: 'center' }} >
        <Alert onClose={handleClose} severity={isError ? "error" : "success"} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
     
  );
};

export default CustomAlert;
