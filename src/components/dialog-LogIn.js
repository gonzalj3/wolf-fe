import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import { FormHelperText } from "@material-ui/core";

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
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [openLogIn, setOpen] = React.useState(false);
  const [serverResponse, setServerResponse] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = () => {
    console.log("info getting conveyed");
    //const { firstName, lastName, schoolName, email, password, thing } = values;
    //console.log(thing);
    console.log(email, password);
    //Make a request to backend
    const url = "http://localhost:4000/api/login";
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    };
    fetch(url, options)
      .then((res) => res.json())
      .then((res) => {
        //If success to create a new account, redirect to login page
        if (!res.error) {
          //Save data on local storage
          localStorage.setItem("isAuthenticated", true);
          localStorage.setItem("user", JSON.stringify(res.user));
          localStorage.setItem("token", JSON.stringify(res.token));

          //Update the state of Auth providers
          /*dispatchIsAuthenticated(setIsAuthenticated(true));
          dispatchUser(fetchUserSuccess(res.user));*/
          console.log("login successfully");

          //Redirect to dashboard
          window.location.replace("/gameboard");
        } else {
          throw Error(res.error);
        }
      })
      .catch((e) => {
        console.log(e.message);
        /*dispatchUser(fetchUserFailure(e.message));*/
        setServerResponse(e.message);
      });
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
            id="email"
            name="email"
            label="Email Address"
            type="email"
            onInput={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="password"
            name="password"
            label="Password"
            type="password"
            onInput={(e) => setPassword(e.target.value)}
            fullWidth
          />
          <FormHelperText error={true} className={classes.error}>
            {serverResponse}
          </FormHelperText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onSubmit} color="primary">
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
