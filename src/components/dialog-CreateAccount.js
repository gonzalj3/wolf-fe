import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Checkbox from "@material-ui/core/Checkbox";
import FormLabel from "@material-ui/core/FormLabel";

import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    background: "transparent",
    color: "primary",
    border: "none",
    textDecoration: "none",
  },
  link: {
    position: "relative",
    zIndex: "2",
  },
  termsBox: {
    display: "flex",
    alignItems: "center",
  },
}));

export default function LogIn({ buttonTitle }) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        className={classes.button}
        onClick={handleClickOpen}
      >{`create account`}</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {`Create ` + buttonTitle + ` Account`}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="First Name"
            type="string"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Last Name"
            type="string"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="School Name"
            type="string"
            fullWidth
          />
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
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Verify Password"
            type="password"
            fullWidth
          />
          <div className={classes.termsBox}>
            <FormLabel>
              {
                <div>
                  <span>I agree to the </span>
                  <Link href="/terms">terms</Link>
                </div>
              }
            </FormLabel>
            <Checkbox color="primary" />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
