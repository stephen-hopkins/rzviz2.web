import React, {useRef, useState} from 'react';
import {
  NewRvizUser,
  subscriptionStatusValues,
  userLevelValues
} from "../models/RvizUser";
import {useFormik} from "formik";
import FormikInputText from "./FormikInputText";
import {Button} from "primereact/button";
import {classNames} from "primereact/utils";
import FormikDropdown from "./FormikDropdown";
import {useNavigate} from "react-router-dom";
import {Toast} from "primereact/toast";
import {Password} from "primereact/password";
import {ProgressSpinner} from "primereact/progressspinner";
import {Card} from "primereact/card";
import {fetchPost} from "../helpers/fetch";
import {useMsal} from "@azure/msal-react";

const initialValues = {
  displayName: '',
  givenName: '',
  surname: '',
  email: '',
  jobTitle: '',
  internalExternal: 'External',
  level: 'User',
  subscriptionStatus: 'Free',
  password: ''
} as NewRvizUser;

function AddUser() {

  const navigate = useNavigate();
  const toast = useRef(null as Toast | null);
  const [loading, setLoading] = useState(false);
  const msal = useMsal();

  const onSubmit = async (newUser: NewRvizUser) => {

    setLoading(true);
    const res = await fetchPost(`${process.env.REACT_APP_API_ROOT}user`, newUser, msal);
    console.log(res);
    if (res) {
      if (res.ok) {
        navigate('/users/list');
        return;
      }
      const body = await res.text();
      console.error("Error adding user", body);
      setLoading(false);
      toast.current?.show({severity: 'error', summary: 'Error', detail: body, sticky: true})
    }
  };

  const validate = (data: NewRvizUser) => {
    // all are required
    const keys = ['displayName', 'givenName', 'surname', 'email', 'jobTitle', 'level',
      'subscriptionStatus', 'password'] as (keyof NewRvizUser)[];
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
  };

  const formik = useFormik({initialValues, onSubmit, validate});

  const canSubmit = formik.dirty && formik.isValid;

  return (
    <Card title="Add user" className="mt-2 md:mt-4 m-auto md:w-4">
      <form onSubmit={formik.handleSubmit}>
        <div className="formgrid grid">
          <div className="field col-12 md:col-6 mt-2">
            <FormikInputText<NewRvizUser> field='email' displayName="Email" formik={formik} />
          </div>
          <div className="field col-12 md:col-6 mt-1 md:mt-2">
            <Password className={classNames('w-full')} key='password' value={formik.values['password'] as string}
                      onChange={e => formik.setFieldValue('password', e.target.value)} placeholder="Password"/>
          </div>
          <div className="field col-12 md:col-6 mt-3">
            <FormikDropdown<NewRvizUser> field='subscriptionStatus' displayName="Subscription status"
                                         options={[...subscriptionStatusValues]} formik={formik}/>
          </div>
          <div className="field col-12 md:col-6 mt-3">
            <FormikDropdown<NewRvizUser> field='level' displayName="Level" options={[...userLevelValues]}
                                         formik={formik}/>
          </div>
          <div className="field col-12 md:col-6 mt-3">
            <FormikInputText<NewRvizUser> field='givenName' displayName="Given name" formik={formik}/>
          </div>
          <div className="field col-12 md:col-6 mt-3">
            <FormikInputText<NewRvizUser> field='surname' displayName="Surname" formik={formik}/>
          </div>
          <div className="field col-12 md:col-6 mt-3">
            <FormikInputText<NewRvizUser> field='displayName' displayName="Display name" formik={formik}/>
          </div>
          <div className="field col-12 md:col-6 mt-3">
            <FormikInputText<NewRvizUser> field='jobTitle' displayName="Job title" formik={formik}/>
          </div>
          <div className="field col-12 flex justify-content-center">
            <Button className="w-4" type="submit" label="Submit" disabled={!canSubmit} severity={canSubmit ? 'success' : 'warning'}/>
          </div>
          <Toast ref={toast} position="bottom-right"/>
          {loading && <ProgressSpinner className='overlay-spinner'/>}
        </div>
      </form>
    </Card>
  );
}

export default AddUser;