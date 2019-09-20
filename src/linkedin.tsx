import React, { useEffect } from "react";
import logo from "./img/default.png";
import { IButtonType } from "./types";
import { defaultStyle, getCode, getIsMobile, imgStyle, popUp } from "./utils";

function LinkedIn(props: IButtonType) {
  useEffect(() => {
    const code = getCode();
    if (code && !props.isMobile) {
      window.close();
      window.opener.postMessage({ code, from: "linkedIn" }, "/");
    } else if (code && props.isMobile) {
      alert(`Response Code: ${code}`);
    }
  }, []);

  return (
    <button onClick={e => popUp(e, props)} style={defaultStyle}>
      <img style={imgStyle} src={logo} alt="Log in with Linked In" />
    </button>
  );
}

LinkedIn.defaultProps = {
  disableMobileRedirect: true,
  isMobile: getIsMobile(),
  redirectUri: window.location.href,
  responseType: "code",
  scope: encodeURIComponent("r_liteprofile r_emailaddress"),
  state: ""
};

export default LinkedIn;
