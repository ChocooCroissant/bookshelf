import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { HighlightOff } from "@mui/icons-material";


type EditBookModalProps = {
  open: boolean;
  handleClose: () => void;
  handleSubmit: (status: number) => Promise<void>;
};

const CreateEditModal: React.FC<EditBookModalProps> = ({ open, handleClose, handleSubmit }) => {
  const { register, handleSubmit: handleFormSubmit, reset } = useForm();

  const onSubmit = (status: number) => {
    handleSubmit(status);
    handleClose();
    reset();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{
        borderRadius: '8px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      }}>
        <div className="flex flex-between items-center">
          <Typography sx={{fontFamily: "inherit"}} id="modal-modal-title" variant="h6" component="h2">
            Set book status
          </Typography>
          <Button onClick={handleClose}>
            <HighlightOff sx={{color: "black"}}/>
          </Button>
        </div>
        <div>
          <Typography id="modal-modal-description" sx={{mb: 0.5, mt: 2, fontFamily: "inherit" }}>
            Status
          </Typography>
          <form onSubmit={handleFormSubmit(onSubmit)} noValidate>
            <TextField
              fullWidth
              placeholder="0-New, 1-Reading, 2-Finished"
              type="status"
              {...register("status", { required: true })}
            />
            <div className="flex mt-7 gap-5">
              <Button
                fullWidth 
                sx={{
                  backgroundColor: 'white',
                  borderColor: '#6200EE',
                  border: "1px solid",
                  color: '#6200EE',
                  textTransform: 'none',
                  fontFamily: "inherit",
                  '&:hover': {
                    backgroundColor: 'white', // Установка цвета фона при наведении
                  }      
                }} 
                onClick={handleClose} 
                variant="contained"
              >
                Close
              </Button>
              <Button 
                fullWidth 
                type="submit"
                sx={{
                  backgroundColor: '#6200EE',
                  textTransform: 'none',
                  fontFamily: "inherit"
                }} 
                variant="contained"
              >
                Set
              </Button>
            </div>
          </form>
        </div>
      </Box>
    </Modal>
  );
};

export default CreateEditModal;