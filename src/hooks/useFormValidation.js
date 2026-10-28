import { useState, startTransition } from 'react';

/**
 * Lightweight controlled-form hook.
 * `validate(values) -> { fieldName: errorMessage }` returns an object of current errors.
 */
export function useFormValidation(initialValues, validate) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
  const { name, value, type, checked } = e.target;
  const nextValue = type === 'checkbox' ? checked : value;
  const nextValues = { ...values, [name]: nextValue };
  
  setValues(nextValues);
  
  if (touched[name]) {
    startTransition(() => {
      setErrors(validate(nextValues));
    });
  }
};

const handleBlur = (e) => {
  const { name } = e.target;
  setTouched((t) => ({ ...t, [name]: true }));
  startTransition(() => {
    setErrors(validate(values));
  });
};

  const validateAll = () => {
    const errs = validate(values);
    setErrors(errs);
    setTouched(
      Object.keys(values).reduce((acc, k) => ({ ...acc, [k]: true }), {})
    );
    return Object.keys(errs).length === 0;
  };

  const reset = (next = initialValues) => {
    setValues(next);
    setErrors({});
    setTouched({});
  };

  return { values, errors, touched, handleChange, handleBlur, validateAll, reset, setValues };
}