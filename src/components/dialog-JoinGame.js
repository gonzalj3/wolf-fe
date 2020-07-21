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

export default function JoinGame({ buttonTitle }) {
  const classes = useStyles();
  const [gameCode, setGameCode] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");

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
    console.log(gameCode, firstName, lastName);
    //Make a request to backend
    const url = "http://localhost:4000/api/joinGame";
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        gameCode,
        firstName,
        lastName,
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
            id="firstName"
            name="firstName"
            label="First name"
            //type="password"
            onInput={(e) => setFirstName(e.target.value)}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="lastName"
            name="lastName"
            label="Last Name"
            //type="password"
            onInput={(e) => setLastName(e.target.value)}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="gameCode"
            name="gameCode"
            label="Game Code"
            //type="email"
            onInput={(e) => setGameCode(e.target.value)}
            fullWidth
          />

          <FormHelperText error={true} className={classes.error}>
            {serverResponse}
          </FormHelperText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onSubmit} color="primary">
            Join
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
