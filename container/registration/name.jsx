import React, { useContext, useState } from "react";
// import "../styleSheet.css";
import TextField from "@material-ui/core/TextField";
// import { FaArrowRight } from "react-icons/fa";
import Button from "@material-ui/core/Button";
import { InputPropsStyle, InputLabelPropsStyle } from "../login";
import { RegDataContext } from "../../container/registration/index_1";
// import Fade from "react-reveal/Fade";
import { name_validator } from "./FormValidator";


function FirstLastNameComp() {
  const [firstNameError, setfirstNameError] = useState(false);
  const [lastNameError, setlastNameError] = useState(false);
  const regDataContext = useContext(RegDataContext);
  const { regState, userState, fade } = regDataContext;

  const goNext = (e) => {
    e.preventDefault();
    console.log('Her')
    let fNameisValid = validateFirstName();
    let lnameisValid = validateLastName();
    if (fNameisValid && lnameisValid) {
      fade.set({ fadeL: false, fadeR: true });
      regState.set(regState.val + 1);
    }
  };

  const validateFirstName = () => {
    if (name_validator(userState.val.firstName)) {
      setfirstNameError(false);
      return true;
    } else {
      setfirstNameError(true);
      return false;
    }
  };
  const validateLastName = () => {
    if (name_validator(userState.val.lastName)) {
      setlastNameError(false);
      return true;
    } else {
      setlastNameError(true);
      return false;
    }
  };

  return (
    <div className="namesComp">
      <Fade right={fade.fadeVal.fadeR} left={fade.fadeVal.fadeL} distance="30%">
        <h5>Enter Your Name</h5>
        <form onSubmit={goNext}>
          <TextField
            error={firstNameError}
            helperText={
              firstNameError ? "Enter Alphabets Only and min 3 char" : ""
            }
            FormHelperTextProps={{ className: "helpertxt" }}
            className="w-100"
            margin="dense"
            size="medium"
            label="First Name"
            variant="outlined"
            type="text"
            InputLabelProps={InputLabelPropsStyle}
            InputProps={InputPropsStyle}
            value={userState.val.firstName}
            onChange={(e) =>
              userState.set({ ...userState.val, firstName: e.target.value })
            }
            onBlur={validateFirstName}
          /></form>
          <form onSubmit={goNext}>
          <TextField
            error={lastNameError}
            helperText={
              lastNameError ? "Enter Alphabets Only and min 3 char" : ""
            }
            FormHelperTextProps={{ className: "helpertxt" }}
            className="w-100"
            margin="dense"
            size="medium"
            label="Last Name"
            variant="outlined"
            type="text"
            InputLabelProps={InputLabelPropsStyle}
            InputProps={InputPropsStyle}
            value={userState.val.lastName}
            onChange={(e) =>
              userState.set({ ...userState.val, lastName: e.target.value })
            }
            onBlur={validateLastName}
          /></form>
        
      </Fade>
      <Button
        className="bg-blue mt-3 btn-style next-btn px-5"
        variant="contained"
        color="primary"
        endIcon={<FaArrowRight size="14px" />}
        onClick={goNext}
      >
        Next
      </Button>
    </div>
  );
}

export default FirstLastNameComp;
