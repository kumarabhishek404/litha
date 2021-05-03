import React from "react";
import { HashLoader } from "react-spinners";
// import { PRIMARY } from "../../lib/color";

export default function Loader(props) {
  const mobile = {
    "display": "block",
    "margin": "0 auto",
    "border-width": "5px"
  }
  return (
    <HashLoader
      css={mobile}
      sizeUnit={"px"}
      size={props.size || 50}
      color="#000"
      loading={props.isLoading}
    />
  );
}
