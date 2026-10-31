import { useState, startTransition } from 'react';

export function useFormValidation(initialValues, validate) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let nextValue = type === 'checkbox' ? checked : value;

    // --- CHARACTER FILTERING ---
    if (typeof nextValue === 'string') {
      if (name === 'name' || name === 'businessName') {
        // Names: Allow only letters, numbers, spaces, hyphens, apostrophes, ampersands, and periods
        // Fixed: Removed the escape slash before the hyphen at the end
        nextValue = nextValue.replace(/[^a-zA-Z0-9\s-'&.]/g, '');
      } else if (name === 'email') {
        // Email: Allow only standard email characters
        // Fixed: Removed the escape slash before the hyphen at the end
        nextValue = nextValue.replace(/[^a-zA-Z0-9@._%+-]/g, '');
      }
    }

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