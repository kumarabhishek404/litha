import css from "@emotion/css";
import React, { useState } from "react";
import { ClipLoader, PropagateLoader, PulseLoader, PuffLoader, FadeLoader, MoonLoader } from "react-spinners";
import { PRIMARY } from "../../lib/colors";
import { PageLoader } from "../../lib/rxSubject";

/**
 * @description add your custom loader
 * @author Jagannath
 * @date 2021-02-04
 * @param type : "normal" / null
 * @param isLoading : boolean / if normal then
 * @param props type: [PulseLoader, PuffLoader, PropagateLoader, ClipLoader]
 */
const CustomDataLoader = (props) => {
  const { size, margin, type, loading = false, isLoading, ...others } = props;
  const [pageLoading, setLoading] = useState(loading || false);

  PageLoader.subscribe((flag) => setLoading(flag));

  const mobile = css`
    display: block;
    margin: 0 auto;
    border-width: 5px;
  `;

  if (type === 'normal') {
    return (
      <span className={isLoading ? 'visiblity-visible' : 'hidden'}>
        <PulseLoader
          css={mobile}
          sizeUnit={"px"}
          size={size || 10}
          margin={margin || 5}
          color={PRIMARY}
          loading={true}
          {...others}
        />
      </span>
    )
  }

  if (type === 'PropagateLoader') {
    return (
      <PropagateLoader
        css={mobile}
        sizeUnit={"px"}
        size={size || 10}
        margin={margin || 5}
        color={PRIMARY}
        loading={pageLoading || loading}
        {...others}
      />
    )
  }
  if (type === 'PuffLoader') {
    return (
      <PuffLoader
        css={mobile}
        sizeUnit={"px"}
        size={size || 10}
        color={PRIMARY}
        loading={pageLoading}
        {...others}
      />
    )
  }
  if (type === 'ClipLoader') {
    return (
      <ClipLoader
        css={mobile}
        sizeUnit={"px"}
        size={size || 2}
        color={PRIMARY}
        loading={pageLoading}
        {...others}
      />
    )
  }
  if (type === 'FadeLoader') {
    return (
      <FadeLoader
        css={mobile}
        sizeUnit={"px"}
        // size={size || 2}
        size={1}
        color={PRIMARY}
        loading={pageLoading}
        {...others}
      />
    )
  }
  if (type === 'MoonLoader') {
    return (
      <MoonLoader
        sizeUnit={"px"}
        size={size || 2}
        // size={65}
        color={PRIMARY}
        loading={pageLoading}
        {...others}
      />
    )
  }
  return (
    <PulseLoader
      css={mobile}
      sizeUnit={"px"}
      size={size || 10}
      margin={margin || 5}
      color={PRIMARY}
      loading={pageLoading}
      {...others}
    />
  );
}
export default CustomDataLoader;