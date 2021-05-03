import React, { useContext } from "react";
// import "../styleSheet.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { InputPropsStyle, InputLabelPropsStyle } from "../login";
import { RegDataContext } from "../../container/registration/index_1";
// import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import Fade from "react-reveal/Fade";

function DOBComp() {
  const currentDate = new Date();
  const dateFormatted = `${currentDate.getFullYear() - 18}-${String(
    currentDate.getMonth() + 1
  ).padStart(2, "0")}-${currentDate.getDate()}`;
  const regDataContext = useContext(RegDataContext);
  const { regState, userState, fade } = regDataContext;
  userState.val.dobDetail = dateFormatted;
  const goNext = (e) => {
    e.preventDefault()
    fade.set({ fadeL: false, fadeR: true });
    regState.set(regState.val + 1);
  };
  const goBack = () => {
    fade.set({ fadeL: true, fadeR: false });
    regState.set(regState.val - 1);
  };

  return (
    <div className="namesComp">
      <FaArrowLeft className="back-btn" onClick={goBack} />
      <Fade right={fade.fadeVal.fadeR} left={fade.fadeVal.fadeL} distance="30%">
        <h5>Select Your DOB</h5>
        <form onSubmit={goNext}>
        <TextField
          className="w-100"
          variant="outlined"
          InputLabelProps={InputLabelPropsStyle}
          InputProps={InputPropsStyle}
          id="date"
          label="Birthday"
          type="date"
          defaultValue={userState.val.dobDetail}
          onChange={(e) => {
            userState.set({ ...userState.val, dobDetail: e.target.value });
          }}
          inputProps={{
            max: dateFormatted,
          }}
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
};

export default DOBComp;
