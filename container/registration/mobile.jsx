import React, { useContext, useState } from "react";
// import "../styleSheet.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { InputPropsStyle, InputLabelPropsStyle } from "../login";
import { RegDataContext } from "../../container/registration/index_1";
// import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
// import OtpInput from "react-otp-input";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import Fade from "react-reveal/Fade";
import { basic_mobNum_validator } from "./FormValidator";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 250,
    height: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    textAlign: "center",
  },
}));

function MobileNumComp() {
  const [isNumError, setisNumError] = useState(false);
  const classes = useStyles();
  const [OTP, setOTP] = useState("");
  const [isOTPError, setisOTPError] = useState(false);
  const [isModalOpen, setisModalOpen] = useState(false);
  const regDataContext = useContext(RegDataContext);
  const { regState, userState, fade, numVerified } = regDataContext;
  const sendOTP = (e) => {
    e.preventDefault()
    let isValidNum = validateNumber();
    if (!isValidNum) return;
    if (numVerified.val) goNext();
    else setisModalOpen(true);
  };
  const goBack = () => {
    fade.set({ fadeL: true, fadeR: false });
    regState.set(regState.val - 1);
  };
  const goNext = () => {
    fade.set({ fadeL: false, fadeR: true });
    regState.set(regState.val + 1);
  };
  const changeOTP = (e) => {
    setOTP(e);
  };
  const submitOTP = (e) => {
    e.preventDefault()
    if (OTP === "1111") {
      setisOTPError(false);
      numVerified.set(true);
      goNext();
    } else {
      setisOTPError(true);
    }
  };
  const validateNumber = () => {
    if (basic_mobNum_validator(userState.val.mobileNum)) {
      setisNumError(false);
      return true;
    } else {
      setisNumError(true);
      return false;
    }
  };
  return (
    <div className="namesComp">
      <FaArrowLeft className="back-btn" onClick={goBack} />
      <Fade right={fade.fadeVal.fadeR} left={fade.fadeVal.fadeL} distance="30%">
        <h5>Enter Your Mobile Number</h5>
        <form onSubmit={sendOTP}>
          <TextField
            error={isNumError}
            helperText={isNumError ? "Please Enter A Valid Number" : ""}
            FormHelperTextProps={{ className: "helpertxt" }}
            className="w-100"
            margin="dense"
            size="medium"
            label="Mobile Num"
            variant="outlined"
            type="number"
            InputLabelProps={InputLabelPropsStyle}
            InputProps={InputPropsStyle}
            value={userState.val.mobileNum}
            onChange={(e) => {
              numVerified.set(false);
              userState.set({ ...userState.val, mobileNum: e.target.value });
            }}
            onBlur={validateNumber}
          />
        </form>
      </Fade>
      <Button
        className="bg-blue mt-3 btn-style next-btn px-5"
        variant="contained"
        color="primary"
        endIcon={<FaArrowRight size="14px" />}
        onClick={sendOTP}
      >
        {numVerified.val ? "Next" : "Send OTP"}
      </Button>
      <Modal
        open={isModalOpen}
        onClose={() => setisModalOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className="ModalBox"
      >
        <div className={classes.paper}>
          <h4>Enter OTP</h4>
          <OtpInput
            value={OTP}
            numInputs={4}
            onChange={changeOTP}
            className="OTP-box"
          />
          {isOTPError ? <h4>Please Enter A Valid OTP</h4> : ""}
          <Button
            className="bg-blue mt-3 btn-style next-btn px-5"
            variant="contained"
            color="primary"
            endIcon={<FaArrowRight size="14px" />}
            onClick={submitOTP}
          >
            Submit OTP
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default MobileNumComp;
