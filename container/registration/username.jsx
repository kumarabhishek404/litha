import React, { useContext, useState } from "react";
// import "../styleSheet.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { InputPropsStyle, InputLabelPropsStyle } from "../login";
import { RegDataContext } from "../../container/signup";
// import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import Fade from "react-reveal/Fade";
import { username_validator } from "./FormValidator";

function UserNameComp() {
  const [userNameError, setuserNameError] = useState(false);
  const regDataContext = useContext(RegDataContext);
  const { regState, userState, fade } = regDataContext;
  const goNext = (e) => {
    e.preventDefault()
    let userNameisValid = validateUserName();
    if (!userNameisValid) return;
    fade.set({ fadeL: false, fadeR: true });
    regState.set(regState.val + 1);
  };
  const goBack = () => {
    fade.set({ fadeL: true, fadeR: false });
    regState.set(regState.val - 1);
  };
  const validateUserName = () => {
    if (!username_validator(userState.val.userName)) {
      setuserNameError(true);
      return false;
    } else {
      setuserNameError(false);
      return true;
    }
  };

  return (
    <div className="namesComp">
      <FaArrowLeft className="back-btn" onClick={goBack} />
      <Fade right={fade.fadeVal.fadeR} left={fade.fadeVal.fadeL} distance="30%">
        <h5>Enter Username</h5>
        <form onSubmit={goNext}>
        <TextField
          error={userNameError}
          helperText={
            userNameError ? "Hey! Please Enter Alphabets and Num Only" : ""
          }
          FormHelperTextProps={{ className: "helpertxt" }}
          className="w-100"
          margin="dense"
          size="medium"
          label="User Name"
          variant="outlined"
          type="text"
          InputLabelProps={InputLabelPropsStyle}
          InputProps={InputPropsStyle}
          value={userState.val.userName}
          onChange={(e) =>
            userState.set({ ...userState.val, userName: e.target.value })
          }
          onBlur={validateUserName}
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

export default UserNameComp;
