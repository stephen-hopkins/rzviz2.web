import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {msalConfig} from "./authConfig";
import {PublicClientApplication} from "@azure/msal-browser";
import {MsalProvider} from "@azure/msal-react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import NavigationMenu from "./components/NavigationMenu";
import UserList, {loader as userListLoader} from "./components/UserList";
import ErrorPage from "./components/ErrorPage";
import AddUser from "./components/AddUser";

const msalInstance = new PublicClientApplication(msalConfig);

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavigationMenu />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "users/list",
        element: <UserList />,
        loader: userListLoader
      },
      {
        path: "users/add",
        element: <AddUser />
      }
    ]
  }
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <RouterProvider router={router} />
    </MsalProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
