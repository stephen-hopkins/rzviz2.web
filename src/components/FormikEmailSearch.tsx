import React, {useState} from 'react';
import {InputText} from "primereact/inputtext";
import {classNames} from "primereact/utils";
import {AutoComplete} from "primereact/autocomplete";
import {FormikErrors, FormikTouched} from "formik";
import {fetchGet} from "../helpers/fetch";
import {useMsal} from "@azure/msal-react";
import {FormEvent} from "primereact/ts-helpers";
import {RvizUser} from "../models/RvizUser";

type Email = {
  email: string
}

type Props = {
  search: boolean
  formik: {
    values: Email,
    setFieldValue: (field: string, value: string) => void,
    touched: FormikTouched<Email>,
    errors: FormikErrors<Email>,
    setFieldTouched: (field: string) => void
  }
}

function FormikEmailSearch({formik, search}: Props) {

  const msal = useMsal();
  const [emails, setEmails] = useState([] as string[]);

  const searchAD = async () => {
    const res = await fetchGet<RvizUser[]>(`${process.env.REACT_APP_API_ROOT}users?email=${formik.values["email"]}`, msal.instance);
    if (res) {
      setEmails(res.map(u => u.email));
    }
  }

  const isFormFieldInvalid = !!(formik.touched["email"] && formik.errors["email"]);
  const onChange = (e: FormEvent) => {
    formik.setFieldValue("email", e.value);
    formik.setFieldTouched("email");
  };

  return (
    <span className="p-float-label">
          <AutoComplete id="email" name="email" value={formik.values["email"]} onChange={onChange} delay={500}
                        className={classNames('w-full', {'p-invalid': isFormFieldInvalid})} suggestions={emails}
                        completeMethod={search ? searchAD : undefined}
          />
          <label htmlFor="email">Email</label>
        </span>
  );
}

export default FormikEmailSearch;