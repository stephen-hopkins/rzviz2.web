/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { LogLevel } from "@azure/msal-browser";

/**
 * Enter here the user flows and custom policies for your B2C application
 * To learn more about user flows, visit: https://docs.microsoft.com/en-us/azure/active-directory-b2c/user-flow-overview
 * To learn more about custom policies, visit: https://docs.microsoft.com/en-us/azure/active-directory-b2c/custom-policy-overview
 */
export const b2cPolicies = {
  names: {
    adSignupSignIn: "B2C_1_signup_signin",
    emailSignIn: "B2C_1_react_sign_in",
    forgotPassword: "b2c_1_reset",
    editProfile: "b2c_1_edit_profile"
  },
  authorities: {
    adSignupSignIn: {
      authority: "https://rviz2.b2clogin.com/rviz2.onmicrosoft.com/B2C_1_signup_signin",
    },
    emailSignIn: {
      authority: "https://rviz2.b2clogin.com/rviz2.onmicrosoft.com/B2C_1_react_sign_in"
    },
    forgotPassword: {
      authority: "https://rviz2.b2clogin.com/rviz2.onmicrosoft.com/b2c_1_reset",
    },
    editProfile: {
      authority: "https://rviz2.b2clogin.com/rviz2.onmicrosoft.com/b2c_1_edit_profile"
    }
  },
  authorityDomain: "rviz2.b2clogin.com"
}

/**
 * Configuration object to be passed to MSAL instance on creation.
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
 */
export const msalConfig = {
  auth: {
    clientId: "889adc33-e173-4615-becc-b216602d48f1", // This is the ONLY mandatory field that you need to supply.
    authority: b2cPolicies.authorities.adSignupSignIn.authority, // Use a sign-up/sign-in user-flow as a default authority
    knownAuthorities: [b2cPolicies.authorityDomain], // Mark your B2C tenant's domain as trusted.
    redirectUri: "/", // Points to window.location.origin. You must register this URI on Azure Portal/App Registration.
    postLogoutRedirectUri: "/", // Indicates the page to navigate after logout.
    navigateToLoginRequestUrl: false, // If "true", will navigate back to the original request location before processing the auth code response.
  },
  cache: {
    cacheLocation: "sessionStorage", // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
          default:
            console.error(message);
        }
      }
    }
  }
};

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit:
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
  scopes: ['https://rviz2.onmicrosoft.com/api/all']
};

export const emailLoginRequest = {
  ...loginRequest,
  ...b2cPolicies.authorities.emailSignIn
}

/**
 * An optional silentRequest object can be used to achieve silent SSO
 * between applications by providing a "login_hint" property.
 */
export const silentRequest = {
  scopes: ["openid", "profile", "all"],
  loginHint: "example@domain.net"
};