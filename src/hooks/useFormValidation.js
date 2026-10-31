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
      if (name === 'name') {
        // STRICT: Allow ONLY letters, spaces, hyphens, and apostrophes. 
        // Blocks numbers, &, ., ", etc.
        nextValue = nextValue.replace(/[^a-zA-Z\s-']/g, '');
      } else if (name === 'businessName') {
        // Business: Allow letters, numbers, spaces, hyphens, apostrophes, and ampersands (e.g. "Barnes & Noble")
        nextValue = nextValue.replace(/[^a-zA-Z0-9\s-'&.]/g, '');
      } else if (name === 'email') {
        // Email: Allow only standard email characters
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