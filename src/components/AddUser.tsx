import React from 'react';
import {NewRvizUser} from "../models/RvizUser";
import {useFormik} from "formik";
import FormikInputText from "./FormikInputText";
import {Button} from "primereact/button";

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

  const onSubmit = () => {
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
  }

  const formik = useFormik({initialValues, onSubmit, validate});

  // const isFormFieldInvalid = (name: keyof NewRvizUser) => !!(formik.touched[name] && formik.errors[name]);
  // const getFormErrorMessage = (name: keyof NewRvizUser) => {
  //   return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
  // };

  return (
    <div className="card flex justify-content-center mt-4">
      <form onSubmit={formik.handleSubmit}>
        <FormikInputText<NewRvizUser> field='email' displayName="Email" formik={formik} />
        <FormikInputText<NewRvizUser> field='displayName' displayName="Display name" formik={formik} />
        <FormikInputText<NewRvizUser> field='givenName' displayName="Given name" formik={formik} />
        <FormikInputText<NewRvizUser> field='surname' displayName="Surname" formik={formik} />
        <FormikInputText<NewRvizUser> field='jobTitle' displayName="Job title" formik={formik} />
        <FormikInputText<NewRvizUser> field='internalExternal' displayName="Internal or external" formik={formik} />
        <FormikInputText<NewRvizUser> field='level' displayName="level" formik={formik} />
        <FormikInputText<NewRvizUser> field='subscriptionStatus' displayName="Subscription status" formik={formik} />
        <Button className="mt-4" type="submit" label="Submit" />
      </form>
    </div>
  );
}

export default AddUser;