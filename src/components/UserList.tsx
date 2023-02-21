import React, {useRef, useState} from 'react';
import {DataTable, DataTableRowEditCompleteEvent} from "primereact/datatable";
import {Column, ColumnEditorOptions} from "primereact/column";
import {useLoaderData, useRevalidator} from "react-router-dom";
import {
  internalExternalValues,
  RvizUser,
  subscriptionStatusValues,
  userLevelValues
} from "../models/RvizUser";
import {InputText} from "primereact/inputtext";
import {Dropdown} from "primereact/dropdown";
import {Toast} from "primereact/toast";
import {ProgressSpinner} from "primereact/progressspinner";

export async function loader() {
  const res = await fetch(`${process.env.REACT_APP_API_ROOT}users`);
  if (res.ok) {
    return await res.json();
  }
  console.error("Error fetching user list");
  return [];
}

function UserList() {

  const users = useLoaderData() as RvizUser[];
  const revalidator = useRevalidator();
  const toast = useRef(null as Toast | null);
  const [saving, setSaving] = useState(false);

  const onRowEditComplete = async (e: DataTableRowEditCompleteEvent) => {
    setSaving(true);
    var newData = e.newData as RvizUser;
    const res = await fetch(`${process.env.REACT_APP_API_ROOT}user/${newData.id}`, {
      method: 'PATCH',
      body: JSON.stringify(newData)
    });
    if (res.ok) {
      revalidator.revalidate();
    } else {
      const body = await res.text();
      console.error("Error adding user", body);
      toast.current?.show({severity: 'error', summary: 'Error', detail: body})
    }
    setSaving(false);
  };

  const textEditor = (options: ColumnEditorOptions) => <InputText type="text" value={options.value}
                                                                  onChange={(e) => options.editorCallback && options.editorCallback(e.target.value)}/>

  const dropdownEditor = (options: ColumnEditorOptions) => {
    let dropdownOptions = [] as string[];
    if (options.field === 'internalExternal') {
      dropdownOptions = [...internalExternalValues];
    } else if (options.field === 'level') {
      dropdownOptions = [...userLevelValues];
    } else if (options.field === 'subscriptionStatus') {
      dropdownOptions = [...subscriptionStatusValues];
    }
    return <Dropdown options={dropdownOptions} value={options.value}
                     onChange={e => options.editorCallback && options.editorCallback(e.target.value)}/>
  }

  return (
    <>
      <DataTable value={users} editMode="row" dataKey="id" className="m-4" responsiveLayout="scroll"
                 onRowEditComplete={onRowEditComplete}>
        <Column field="displayName" header="Display Name" editor={textEditor}></Column>
        <Column field="email" header="Email"></Column>
        <Column field="givenName" header="Given Name" editor={textEditor}></Column>
        <Column field="surname" header="Surname" editor={textEditor}></Column>
        <Column field="internalExternal" header="Internal / External" editor={dropdownEditor}></Column>
        <Column field="jobTitle" header="Job Title" editor={textEditor}></Column>
        <Column field="level" header="Level" editor={dropdownEditor}></Column>
        <Column field="subscriptionStatus" header="Subscription Status" editor={dropdownEditor}></Column>
        <Column rowEditor headerStyle={{width: '10%', minWidth: '8rem'}} bodyStyle={{textAlign: 'center'}}></Column>
      </DataTable>
      <Toast ref={toast}/>
      {saving && <ProgressSpinner className='overlay-spinner' />}
    </>
  );
}

export default UserList;