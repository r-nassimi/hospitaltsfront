import Snackbar from "@mui/material/Snackbar";

const Snackbars = ({ snackText, snackOpen, setSnackOpen }) => {
  const handleClose = (value, type) => {
    setSnackOpen(false);
  };
  return (
    <div>
      <Snackbar
        open={snackOpen}
        onClose={handleClose}
        message={snackText}
      />
    </div>
  );
};

export default Snackbars;
