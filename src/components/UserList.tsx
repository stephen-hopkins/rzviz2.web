import React from 'react';
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {useLoaderData} from "react-router-dom";

export async function loader() {
  const res = await fetch(`${process.env.REACT_APP_API_ROOT}listusers`);
  if (res.ok) {
    return await res.json();
  }
  console.error("Error fetching user list");
  return [];
}

function UserList() {

  const users = useLoaderData() as [];

  return (
    <DataTable value={users} className="lg:m-4" responsiveLayout="scroll">
      <Column field="displayName" header="Display Name"></Column>
      <Column field="email" header="Email"></Column>
      <Column field="givenName" header="Given Name"></Column>
      <Column field="surname" header="Surname"></Column>
      <Column field="internalExternal" header="Internal / External"></Column>
      <Column field="jobTitle" header="Job Title"></Column>
      <Column field="level" header="Level"></Column>
      <Column field="subscriptionStatus" header="Subscription Status"></Column>
    </DataTable>
  );
}

export default UserList;