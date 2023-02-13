import {useMsal} from "@azure/msal-react";

export function useIsAdmin(): boolean {
  const instance = useMsal();
  if (instance.accounts.length >= 1) {
    const account = instance.accounts[0];
    if (account.idTokenClaims?.hasOwnProperty('extension_IsAdmin')) {
      if (account.idTokenClaims['extension_IsAdmin'] === true) {
        return true;
      }
    }
  }
  return false;
}