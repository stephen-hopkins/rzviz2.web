import React from 'react';
import {useIsAuthenticated} from "@azure/msal-react";

function LoginDisplay() {

  const isAuthenticated = useIsAuthenticated();

  return (
    <p>You are {isAuthenticated ? '' : 'not'} logged in.</p>
  );
}

export default LoginDisplay;