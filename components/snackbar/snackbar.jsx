import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { snakbar } from "../../lib/rxSubject";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "500px",
    "& > * + *": {
      marginTop: theme.spacing(2),
      bottom: "70px",
      left: '20px'
    },
  },
}));

export default function CustomizedSnackbars() {
  const classes = useStyles();
  const [isPageloaded, setPageLoaded] = useState();
  const [open, setOpen] = React.useState({
    open: false,
    message: "",
    veriant: "success",
    duration: 2000
  });

  const handleClick = () => {
    let stateObject = { ...open };
    stateObject.open = true;
    setOpen(stateObject);
  };

  useEffect(() => {
    const snak = snakbar.subscribe((data) => {
      let stateObject = { ...open };
      stateObject.open = true;
      stateObject.message = data.message || "";
      stateObject.veriant = data.type || "success";
      stateObject.duration = data.duration || 2000
      setOpen(stateObject);
    });
    setPageLoaded(true);
    return () => {
      return snak && snak.unsubscribe();
    };
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    let stateObject = { ...open };
    stateObject.open = false;
    setOpen(stateObject);
  };

  return (
    <div className={classes.root}>
      {/* <Button variant="outlined" onClick={handleClick}>
        Open success snackbar
      </Button> */}
      {isPageloaded && (
        <Snackbar
          className={classes.root}
          open={open.open}
          autoHideDuration={open.duration || 2000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity={open.veriant}>
            {open.message}
          </Alert>
        </Snackbar>
      )}
      {/* <Alert severity="error">This is an error message!</Alert>
      <Alert severity="warning">This is a warning message!</Alert>
      <Alert severity="info">This is an information message!</Alert>
      <Alert severity="success">This is a success message!</Alert> */}
      <style jsx>{``}</style>
    </div>
  );
}
