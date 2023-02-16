import React from 'react';
import {Menubar} from "primereact/menubar";
import {Button} from "primereact/button";
import {useIsAuthenticated, useMsal} from "@azure/msal-react";
import {loginRequest} from "../authConfig";
import {Outlet, useNavigate} from "react-router-dom";

function NavigationMenu() {

  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  const navigate = useNavigate();

  const menuItems = [
    {
      label: 'Users',
      icon: 'pi pi-users',
      items: [
        {
          label: 'List',
          icon: 'pi pi-list',
          command: () => navigate('/users/list')
        }
      ]
    }
  ]

  const onClickLoginLogout = async () => {
    if (isAuthenticated) {
      await instance.logout();
    } else {
      await instance.loginRedirect(loginRequest);
    }
  }

  return (
    <div className="flex flex-column">
      <Menubar model={menuItems} end={<Button onClick={onClickLoginLogout}>{isAuthenticated ? 'Log out' : 'Log in'}</Button>}/>
      <Outlet />
    </div>
  );
}

export default NavigationMenu;