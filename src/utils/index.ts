import { IButtonType } from "./types";

export const imgStyle = {
  width: 200
};

export const defaultStyle = {
  backgroundColor: "#337ab7",
  borderColor: "#2e6da4",
  color: "#fff",
  cursor: "pointer",
  outline: "none"
};

export const getIsMobile = () => {
  let isMobile = false;

  try {
    isMobile = !!(
      (window.navigator && window.navigator.standalone) ||
      navigator.userAgent.match("CriOS") ||
      navigator.userAgent.match(/mobile/i)
    );
  } catch (ex) {
    // noop
  }

  return isMobile;
};

export const getCode = () => {
  const hashKey = "code=";
  const accessToken = window.location.search.substr(
    window.location.search.indexOf(hashKey) + hashKey.length
  );
  return accessToken;
};

export const popUp = (e: any, props: IButtonType) => {
  e.preventDefault();

  const params = {
    client_id: props.clientId,
    redirect_uri: props.redirectUri,
    response_type: props.responseType,
    scope: props.scope,
    state: props.state
  };

  const payload = toQueryParams(params);

  const url = `https://www.linkedin.com/oauth/v2/authorization?${payload}`;

  const width = 600;
  const height = 600;

  const topPosition =
    window.top.outerHeight / 2 + window.top.screenY - height / 2;
  const left = window.top.outerWidth / 2 + window.top.screenX - width / 2;

  const messageReceiver = event => {
    if (event.origin === window.location.origin) {
      if (event.data.code && event.data.from === "linkedIn") {
        props.onSuccess(event.data);
      }
    }
  };

  if (props.isMobile) {
    window.location.href = url;
    return;
  }

  window.removeEventListener("message", messageReceiver, false);
  window.addEventListener("message", messageReceiver, false);

  return window.open(
    url,
    "_blank",
    `width=${width},height=${height},top=${topPosition},left=${left}`
  );
};

const toQueryParams = obj =>
  Object.entries(obj)
    .map(([key, val]) => `${key}=${val}`)
    .join("&");
