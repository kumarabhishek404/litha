import React, { useContext, useState } from "react";
// import "../styleSheet.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { InputPropsStyle, InputLabelPropsStyle } from "../login";
import { RegDataContext } from "../../container/registration/index_1";
// import { FaArrowRight, FaArrowLeft } from "react-icons/fa";s
import Fade from "react-reveal/Fade";
import { email_validator } from "./FormValidator";

function EmailComp() {
  const regDataContext = useContext(RegDataContext);
  const [emailError, setemailError] = useState(false);
  const { regState, userState, fade } = regDataContext;
  const goNext = (e) => {
    e.preventDefault()
    let isMailValid = validateEmail();
    if (!isMailValid) return;
    fade.set({ fadeL: false, fadeR: true });
    regState.set(regState.val + 1);
  };
  const goBack = () => {
    fade.set({ fadeL: true, fadeR: false });
    regState.set(regState.val - 1);
  };
  const validateEmail = () => {
    if (!email_validator(userState.val.emailID)) {
      setemailError(true);
      return false;
    } else {
      setemailError(false);
      return true;
    }
  };
  return (
    <div className="namesComp">
      <FaArrowLeft className="back-btn" onClick={goBack} />
      <Fade right={fade.fadeVal.fadeR} left={fade.fadeVal.fadeL} distance="30%">
        <h5>Enter Your Mail ID</h5>
        <form onSubmit={goNext}>
        <TextField
          error={emailError}
          FormHelperTextProps={{ className: "helpertxt" }}
          helperText={emailError ? "Please! Try With Different Mail" : ""}
          className="w-100"
          margin="dense"
          size="medium"
          label="Email ID"
          variant="outlined"
          type="email"
          InputLabelProps={InputLabelPropsStyle}
          InputProps={InputPropsStyle}
          value={userState.val.emailID}
          onChange={(e) =>
            userState.set({ ...userState.val, emailID: e.target.value })
          }
          onBlur={validateEmail}
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

export default EmailComp;
