import React from 'react';
import {Menubar} from "primereact/menubar";
import {useIsAuthenticated, useMsal} from "@azure/msal-react";
import {emailLoginRequest, loginRequest} from "../authConfig";
import {Outlet, useNavigate} from "react-router-dom";
import {useIsAdmin} from "../hooks/useIsAdmin";

function NavigationMenu() {

  const isAuthenticated = useIsAuthenticated();
  const {instance} = useMsal();
  const navigate = useNavigate();
  const isAdmin = useIsAdmin();

  const loginItem = {
    label: 'Account',
    icon: 'pi pi-user',
    items: isAuthenticated ? [
      { label: 'Logout', command: () => instance.logout()}
    ] : [
      {
        label: 'AD Login',
        command: () => instance.loginRedirect(loginRequest)
      },
      {
        label: "Email Login",
        command: () => instance.loginRedirect(emailLoginRequest)
      }
    ]
  };

  const menuItems = isAdmin ?  [
    {
      label: 'Users',
      icon: 'pi pi-users',
      items: [
        {
          label: 'List',
          icon: 'pi pi-list',
          command: () => navigate('/users/list')
        },
        {
          label: 'Add',
          icon: 'pi pi-plus',
          command: () => navigate('/users/add')
        }
      ]
    }, loginItem
  ] : [loginItem];

  return (
    <div className="flex flex-column">
      <Menubar model={menuItems} />
      <Outlet />
    </div>
  );
}

export default NavigationMenu;