import React from 'react';
import {classNames} from "primereact/utils";
import {FormikErrors, FormikTouched} from "formik";
import {Dropdown, DropdownChangeEvent} from "primereact/dropdown";

type Props<T> = {
  field: keyof T
  displayName: string,
  options: string[]
  formik: {
    values: T,
    setFieldValue: (field: keyof T, value: string) => void,
    touched: FormikTouched<T>,
    errors: FormikErrors<T>,
    setFieldTouched: (field: keyof T) => void
  }
}

function FormikInputText<T extends {}>({field, displayName, options, formik}: Props<T>) {

  const isFormFieldInvalid = !!(formik.touched[field] && formik.errors[field]);

  const onChange = (e: DropdownChangeEvent) => {
    formik.setFieldValue(field, e.target.value);
    formik.setFieldTouched(field);
  }

  return (
    <span className="p-float-label">
          <Dropdown
            id={field as string}
            name={field as string}
            value={formik.values[field] as string}
            onChange={onChange}
            options={options}
            className={classNames({'p-invalid': isFormFieldInvalid}, 'w-full')}
          />
          <label htmlFor={field as string}>{displayName}</label>
        </span>
  );
}

export default FormikInputText;