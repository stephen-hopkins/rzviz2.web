import {useMsal} from "@azure/msal-react";

export function useIsAdmin(): boolean {
  const instance = useMsal();
  if (instance.accounts.length >= 1) {
    const account = instance.accounts[0];
    if (account.idTokenClaims?.hasOwnProperty('extension_Level')) {
      const level = account.idTokenClaims['extension_Level'];
      if (level === 'Super User' || level === 'Admin') {
        return true;
      }
    }
  }
  return false;
}