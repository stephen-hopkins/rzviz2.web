import React from 'react';
import './App.css';
import LoginDisplay from "./LoginDisplay";
import {useIsAuthenticated, useMsal} from "@azure/msal-react";
import {loginRequest} from "./authConfig";

function App() {

  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  // this is how to trigger a different flow.  eg could be update profile or change password etc
  // const forgotPassword = async () => {
  //   await instance.loginRedirect({...loginRequest, ...b2cPolicies.authorities.forgotPassword});
  // }

  const onClickLoginLogout = async () => {
    if (isAuthenticated) {
      await instance.logout();
    } else {
      await instance.loginRedirect(loginRequest);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <button className="login-button" onClick={onClickLoginLogout}>{isAuthenticated ? 'Log out' : 'Log in'}</button>
        <LoginDisplay />
      </header>
    </div>
  );
}

export default App;
