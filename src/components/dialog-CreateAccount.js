import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Checkbox from "@material-ui/core/Checkbox";
import FormLabel from "@material-ui/core/FormLabel";
import { FormHelperText } from "@material-ui/core";
import { useForm } from "react-hook-form";

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
  const { register, handleSubmit } = useForm();
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [schoolName, setSchoolName] = React.useState("");
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
    console.log(email, password, firstName, lastName, email, schoolName);
    //Make a request to backend
    const url = "http://localhost:4000/api/register";
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        schoolName,
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
      <Button
        className={classes.button}
        onClick={handleClickOpen}
      >{`create account`}</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form>
          <DialogTitle id="form-dialog-title">
            {`Create ` + buttonTitle + ` Account`}
          </DialogTitle>
          <FormHelperText error={true} className={classes.error}>
            {serverResponse}
          </FormHelperText>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="firstName"
              name="firstName"
              label="First Name"
              type="string"
              inputRef={register}
              onInput={(e) => setFirstName(e.target.value)}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="lastName"
              name="lastName"
              label="Last Name"
              type="string"
              inputRef={register}
              onInput={(e) => setLastName(e.target.value)}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="schoolName"
              name="schoolName"
              label="School Name"
              type="string"
              inputRef={register}
              onInput={(e) => setSchoolName(e.target.value)}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="email"
              name="email"
              label="Email Address"
              type="email"
              ref={register}
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
              inputRef={register}
              onInput={(e) => setPassword(e.target.value)}
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
            <Button color="primary" onClick={onSubmit}>
              submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
