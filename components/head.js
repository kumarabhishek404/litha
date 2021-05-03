import React, { useEffect } from "react";
import NextHead from "next/head";
import {
  APP_NAME,
  DESCRIPTION,
  OG_IMAGE,
  WEB_LINK,
} from "../lib/config";

const APPNAME = APP_NAME;
const DESC = DESCRIPTION;
const IMAGE = OG_IMAGE;
const TITLE = APP_NAME;
const LINK = WEB_LINK;

const CustomHead = (props) => {
  // console.log("head tahssssss");
  return (
    <NextHead>
      <meta charSet="UTF-8" />
      <title>{props.ogTitle || TITLE}</title>
      <meta name="title" content={props.ogTitle || TITLE} />
      <meta name="description" content={DESC} />
      <meta name="twitter:card" content={DESC} />
      <meta name="twitter:url" content={LINK} />
      <meta name="twitter:title" content={TITLE} />
      <meta name="twitter:description" content={DESC} />
      <meta name="twitter:image" content={IMAGE} />
      <meta name="twitter:creator" content={APP_NAME} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={TITLE} />
      <meta property="og:description" content={DESC} />
      <meta property="og:site_name" content={APPNAME} />
      <meta property="og:url" content={LINK} />
      <meta property="og:image" content={IMAGE} />
    </NextHead>
  );
};

export default CustomHead;
