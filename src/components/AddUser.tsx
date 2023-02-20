import React, {useRef, useState} from 'react';
import {internalExternalValues, NewRvizUser, subscriptionStatusValues, userLevelValues} from "../models/RvizUser";
import {useFormik} from "formik";
import FormikInputText from "./FormikInputText";
import {Button} from "primereact/button";
import {classNames} from "primereact/utils";
import FormikDropdown from "./FormikDropdown";
import {useNavigate} from "react-router-dom";
import {Toast} from "primereact/toast";
import {Password} from "primereact/password";
import {ProgressSpinner} from "primereact/progressspinner";

const initialValues = {
  displayName: '',
  givenName: '',
  surname: '',
  email: '',
  jobTitle: '',
  internalExternal: 'Internal',
  level: 'User',
  subscriptionStatus: 'Free',
  password: ''
} as NewRvizUser;

function AddUser() {

  const navigate = useNavigate();
  const toast = useRef(null as Toast | null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: NewRvizUser) => {

    setLoading(true);
    const res = await fetch(`${process.env.REACT_APP_API_ROOT}user`, {method: 'POST', body: JSON.stringify(data)});
    if (res.ok) {
      navigate('/users/list');
      return;
    }
    const body = await res.text();
    console.error("Error adding user", body);
    setLoading(false);
    toast.current?.show({severity: 'error', summary: 'Error', detail: body})
  };

  const validate = (data: NewRvizUser) => {
    // all are required
    const keys = Object.keys(data) as (keyof NewRvizUser)[];
    const errors = keys.reduce((acc, key) => {
      if (data[key]) {
        return acc;
      }
      return {
        ...acc,
        [key]: `${key} is required`
      }
    }, {} as NewRvizUser);

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
      errors['email'] = 'Invalid email address';
    }
    return errors;
  }

  const formik = useFormik({initialValues, onSubmit, validate});

  return (
    <div className="card flex justify-content-center mt-4">
      <form onSubmit={formik.handleSubmit}>
        <FormikInputText<NewRvizUser> field='email' displayName="Email" formik={formik} />
        <Password className='mt-5' key='password' value={formik.values['password'] as string} onChange={e => formik.setFieldValue('password', e.target.value)} placeholder="Password"/>
        <FormikInputText<NewRvizUser> field='displayName' displayName="Display name" formik={formik} />
        <FormikInputText<NewRvizUser> field='givenName' displayName="Given name" formik={formik} />
        <FormikInputText<NewRvizUser> field='surname' displayName="Surname" formik={formik} />
        <FormikInputText<NewRvizUser> field='jobTitle' displayName="Job title" formik={formik} />
        <FormikDropdown<NewRvizUser> field='internalExternal' displayName="Internal or external" options={[...internalExternalValues]} formik={formik} />
        <FormikDropdown<NewRvizUser> field='level' displayName="Level" options={[...userLevelValues]} formik={formik} />
        <FormikDropdown<NewRvizUser> field='subscriptionStatus' displayName="Subscription status" options={[...subscriptionStatusValues]} formik={formik} />
        <Button className={classNames("mt-4 w-full")} type="submit" label="Submit" disabled={!formik.isValid} />
      </form>
      <Toast ref={toast} />
      {loading && <ProgressSpinner className='overlay-spinner'/>}
    </div>
  );
}

export default AddUser;