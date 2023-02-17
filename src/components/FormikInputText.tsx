import React from 'react';
import {InputText} from "primereact/inputtext";
import {classNames} from "primereact/utils";
import {FormikErrors, FormikTouched} from "formik";

type Props<T> = {
  field: keyof T
  displayName: string
  formik: {
    values: T,
    setFieldValue: (field: keyof T, value: string) => void,
    touched: FormikTouched<T>,
    errors: FormikErrors<T>
  }
}

function FormikInputText<T extends {}>({field, displayName, formik}: Props<T>) {

  const isFormFieldInvalid = !!(formik.touched[field] && formik.errors[field]);

  return (
    <span className="p-float-label mt-5">
          <InputText
            id={field as string}
            name={field as string}
            value={formik.values[field] as string}
            onChange={(e) => {
              formik.setFieldValue(field, e.target.value);
            }}
            className={classNames({'p-invalid': isFormFieldInvalid})}
          />
          <label htmlFor="input_email">{displayName}</label>
        </span>
  );
}

export default FormikInputText;