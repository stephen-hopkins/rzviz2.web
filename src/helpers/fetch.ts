import {IPublicClientApplication} from "@azure/msal-browser";
import {loginRequest} from "../authConfig";
import {IMsalContext} from "@azure/msal-react";

export async function fetchGet<T>(url: string, msal: IPublicClientApplication) {
  const authHeader = await getAuthHeader(msal);
  const res = await fetch(url, {
    method: 'GET',
    headers: authHeader
  });
  if (res.ok) {
    return await res.json() as T;
  }
  console.error("Error fetching");
  return null;
}

export async function fetchPatch(url: string, data: {}, msal: IMsalContext) {
  const authHeader = await getAuthHeader(msal.instance);
  if (authHeader) {
    return fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: authHeader
    });
  }
}

export async function fetchPost(url: string, data: {}, msal: IMsalContext) {
  const authHeader = await getAuthHeader(msal.instance);
  if (authHeader) {
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: authHeader
    });
  }
}

async function getAuthHeader(msal: IPublicClientApplication) {
  const activeAccount = msal.getActiveAccount();
  const accounts = msal.getAllAccounts();
  if (accounts.length > 0) {
    const result = await msal.acquireTokenSilent({
      ...loginRequest,
      account: activeAccount ?? accounts[0]
    });
    return {
      Authorization: `Bearer ${result.accessToken}`
    }
  }
}