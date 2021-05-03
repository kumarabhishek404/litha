import React from "react";
import NextHead from "next/head";
import {
  APP_NAME,
  OG_TITLE,
  OG_DESC,
  WEB_LINK,
  OG_IMAGE,
  OG_LOGO,
  SMALL_LOGO,
  FB_APP_ID,
} from "../../lib/config";

const defaultTitle = APP_NAME;
const defaultOGTitle = OG_TITLE;
const defaultDescription = OG_DESC;
const defaultOGURL = WEB_LINK;
const defaultOGImage = OG_IMAGE;

/**
 * @description add custom metatags
 * @author jagannath
 * @param props pageTitle: string
 * @param props description: string
 * @param props url: string
 * @param props ogTitle: string
 * @param props metaTags: [string]
 * @param props ogImage: string
 */
const CustomHead = (props) => (
  <NextHead>
    <meta charSet="UTF-8" />
    <title>{props.pageTitle || defaultTitle}</title>
    <meta
      name="description"
      content={props.description || defaultDescription}
    />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"
    />
    <meta property="og:url" content={props.url || defaultOGURL} />
    <meta
      property="og:title"
      content={props.ogTitle || defaultOGTitle || defaultTitle}
    />
    {props.metaTags && props.metaTags.length > 0 && (
      <meta name="keywords" content={props.metaTags.join(",")}></meta>
    )}
    <meta
      property="og:description"
      content={
        typeof props.description != "undefined"
          ? props.description
          : defaultDescription
      }
    />
    <meta property="og:type" content="website" />

    {/* twitter */}
    <meta name="twitter:site" content={props.url || defaultOGURL} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content={props.ogImage || defaultOGImage} />
    <meta
      name="twitter:description"
      content={props.description || defaultDescription}
    />
    {/* og image */}
    <meta property="og:image" content={props.ogImage || OG_LOGO} />
    <meta property="og:image:width" content="512" />
    <meta property="og:image:height" content="512" />

    <meta property="fb:app_id" content={FB_APP_ID} />

    <link href={SMALL_LOGO} rel="icon" />
  </NextHead>
);

export default CustomHead;
