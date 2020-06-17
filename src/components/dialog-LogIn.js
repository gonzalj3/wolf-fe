import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";

import CreateAccount from "../components/dialog-CreateAccount";

const useStyles = makeStyles({
  button: {
    background: "transparent",
    color: "white",
    border: "none",
    textDecoration: "none",
  },
});

export default function LogIn({ buttonTitle }) {
  const classes = useStyles();

  const [openLogIn, setOpen] = React.useState(false);

  const [openCreateAccount, setopenCreateAccount] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpenCreateAccount = () => {
    //setOpen(false);
    setopenCreateAccount(true);
  };
  const handleCloseCreateAccount = () => {
    setopenCreateAccount(false);
  };

  return (
    <div>
      <Button className={classes.button} onClick={handleClickOpen}>
        {`join as ` + buttonTitle}
      </Button>
      <Dialog
        open={openLogIn}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {buttonTitle + ` Log In`}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Password"
            type="password"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            log in
          </Button>
          <CreateAccount buttonTitle={buttonTitle}>
            create account
          </CreateAccount>
        </DialogActions>
      </Dialog>
    </div>
  );
}
