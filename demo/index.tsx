import React from "react";
import ReactDOM from "react-dom";
import LinkedInLogin from "../src/linkedin";

interface IDivElement {
  innerHTML: "";
}

const handleResponse = (code: string) => {
  const html = `<p>Respoonse Code: ${JSON.stringify(code)}</p>`;
  const nullDiv: IDivElement = { innerHTML: "" };
  const el = document.getElementById("demo") || nullDiv;
  el.innerHTML += html;
};

const props = {
  clientId: "814341au9yco4r",
  onFailure: handleResponse,
  onSuccess: handleResponse
};

ReactDOM.render(<LinkedInLogin {...props} />, document.getElementById("demo"));
