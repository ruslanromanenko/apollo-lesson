import React from "react";
import { getToken } from "../../services/token";

const RenderProperties = ({ children }) => (
  <React.Fragment>{getToken() && children}</React.Fragment>
);
export default RenderProperties;
