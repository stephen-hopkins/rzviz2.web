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
    errors: FormikErrors<T>,
    setFieldTouched: (field: keyof T) => void
  }
}

function FormikInputText<T extends {}>({field, displayName, formik}: Props<T>) {

  const isFormFieldInvalid = !!(formik.touched[field] && formik.errors[field]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue(field, e.target.value);
    formik.setFieldTouched(field);
  }

  return (
    <span className="p-float-label">
          <InputText
            id={field as string}
            name={field as string}
            value={formik.values[field] as string}
            onChange={onChange}
            className={classNames('w-full', {'p-invalid': isFormFieldInvalid})}
          />
          <label htmlFor={field as string}>{displayName}</label>
        </span>
  );
}

export default FormikInputText;