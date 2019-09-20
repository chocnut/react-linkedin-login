import React, { useEffect } from "react";
import logo from "./img/default.png";

const defaultStyle = {
  backgroundColor: "#337ab7",
  borderColor: "#2e6da4",
  color: "#fff",
  cursor: "pointer",
  outline: "none"
};

let params = {
  client_id: "81dagyqktqkicg",
  redirect_uri: window.location.href,
  response_type: "code",
  scope: encodeURIComponent("r_liteprofile r_emailaddress")
};

params = Object.entries(params)
  .map(([key, val]) => `${key}=${val}`)
  .join("&");

const url = `https://www.linkedin.com/oauth/v2/authorization?${params}`;

const width = 600;
const height = 600;

const top = window.top.outerHeight / 2 + window.top.screenY - height / 2;
const left = window.top.outerWidth / 2 + window.top.screenX - width / 2;
let modal = null;

const messageReceiver = event => {
  console.log(event);
  modal.close();
};

const popUp = e => {
  e.preventDefault();
  modal = window.open(
    url,
    "_blank",
    `width=${width},height=${height},top=${top},left=${left}`
  );
  window.removeEventListener("message", messageReceiver, false);
  window.addEventListener("message", messageReceiver, false);
};

const getCode = () => {
  const hashKey = "code=";
  const accessToken = window.location.search.substr(
    window.location.search.indexOf(hashKey) + hashKey.length
  );
  return accessToken;
};

export default () => {
  useEffect(() => {
    const code = getCode();
    if (code) {
      window.close();
      window.opener.postMessage(code, "/");
    }
  }, []);

  return (
    <button onClick={popUp} style={defaultStyle}>
      <img src={logo} alt="Log in with Linked In" />
    </button>
  );
};
