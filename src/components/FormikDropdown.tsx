import React from 'react';
import {classNames} from "primereact/utils";
import {FormikErrors, FormikTouched} from "formik";
import {Dropdown} from "primereact/dropdown";

type Props<T> = {
  field: keyof T
  displayName: string,
  options: string[]
  formik: {
    values: T,
    setFieldValue: (field: keyof T, value: string) => void,
    touched: FormikTouched<T>,
    errors: FormikErrors<T>
  }
}

function FormikInputText<T extends {}>({field, displayName, options, formik}: Props<T>) {

  const isFormFieldInvalid = !!(formik.touched[field] && formik.errors[field]);

  return (
    <span className="p-float-label mt-5">
          <Dropdown
            id={field as string}
            name={field as string}
            value={formik.values[field] as string}
            onChange={(e) => {
              formik.setFieldValue(field, e.target.value);
            }}
            options={options}
            className={classNames({'p-invalid': isFormFieldInvalid}, 'w-full')}
          />
          <label htmlFor={field as string}>{displayName}</label>
        </span>
  );
}

export default FormikInputText;