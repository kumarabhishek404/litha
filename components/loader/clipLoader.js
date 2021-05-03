import React from "react";
import { css } from "@emotion/core";
import { MoonLoader } from "react-spinners";
// import { PRIMARY } from "../../lib/color";

export default function Loader(props) {
    // const mobile = {
    //     "display": "block",
    //     "margin": "0 auto",
    //     "border-width": "5px"
    // }
    const override = css`
            display: block;
            margin: 0 auto;
            border-color: red;
            opacity: 1;
            `;
    return (
        <MoonLoader
            css={override}
            sizeUnit={"px"}
            size={22}
            color="#000"
            loading={props.isLoading}
        />
    );
}