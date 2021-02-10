import { useState, useEffect, useCallback } from 'react';

const toBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

/**
 * Determines a value if it's an object
 *
 * @param {object} value
 */
const isObject = value => value !== null && typeof value === 'object';

/**
 * Returns true if the value is RegExp
 *
 * @param {RegExp} value
 */
const isRegExp = value => value instanceof RegExp;

/**
 * Custom hooks to validate your Form
 *
 * @param {object} stateSchema model you stateSchema.
 * @param {object} validationSchema model your validation.
 * @param {function} callback function to be execute during form submission.
 */

const useForm = (stateSchema = {}, validationSchema = {}, callback) => {
  const [state, setState] = useState(stateSchema);
  const [disable, setDisable] = useState(true);
  const [isDirty, setIsDirty] = useState(false);

  // Used to disable submit button if there's an error in state
  // or the required field in state has no value.
  // Wrapped in useCallback to cached the function to avoid intensive memory leaked
  // in every re-render in component
  const validateState = useCallback(() => {
    const hasErrorInState = Object.keys(validationSchema).some(key => {
      const isInputFieldRequired = validationSchema[key].required;
      const stateValue = state[key].value; // state value
      const stateError = state[key].error; // state error

      return (
        (isInputFieldRequired &&
          (!stateValue ||
            (Array.isArray(stateValue) && stateValue.length === 0))) ||
        stateError
      );
      // return (isInputFieldRequired && !stateValue) || stateError;
    });

    return hasErrorInState;
  }, [state, validationSchema]);

  // Disable button in inital render;
  useEffect(() => {
    setDisable(validateState());
  }, []);

  // For every changed in our state this will be fired
  // To be able to disable the button
  useEffect(() => {
    if (isDirty) {
      setDisable(validateState());
    }
  }, [state, isDirty]);

  // Event handler for handling changes in input.
  // eslint-disable-next-line
  const handleOnChange = useCallback(event => {
    setIsDirty(true);

    const { name, value, type } = event.target;

    let error = '';
    if (validationSchema[name].required) {
      if (!value || (Array.isArray(value) && value.length === 0)) {
        error = 'This is a required field.';
      }
    }

    if (isObject(validationSchema[name].validator)) {
      const { maxLength } = validationSchema[name].validator;

      if (maxLength && value.length > maxLength) {
        return;
      }

      if (
        validationSchema[name].validator.regEx &&
        value &&
        !validationSchema[name].validator.regEx.test(value)
      ) {
        // if (!isRegExp(validationSchema[name].validator.regEx)) {
        //   throw new Error("Your RegExp value isn't a valid RegExp Object");
        // }

        // Test your defined RegExp...
        const { validator } = validationSchema[name];
        // eslint-disable-next-line prefer-destructuring
        error = validator.error;
      } else if (
        validationSchema[name].validator.compare &&
        value &&
        validationSchema[name].validator.compare(value)
      ) {
        const { validator } = validationSchema[name];
        // eslint-disable-next-line prefer-destructuring
        error = validator.error2;
      }
    }

    if (type === 'checkbox') {
      setState(prevState => {
        let newValue = prevState[name] ? prevState[name].value || [] : [];

        if (newValue.includes(value)) {
          newValue = newValue.filter(v => v !== value);
        } else {
          newValue.push(value);
        }

        if (validationSchema[name].required) {
          if (!newValue || !newValue.length) {
            error = 'This is required field.';
          }
        }

        return {
          ...prevState,
          [name]: { value: newValue, error },
        };
      });
    } else {
      setState(prevState => ({
        ...prevState,
        [name]: { value, error },
      }));
    }
  });

  const handleOnChangeFile = useCallback((event, previewStateName) => {
    setIsDirty(true);

    const { name, files } = event.target;

    let error = '';
    if (validationSchema[name].required) {
      if (!files) {
        error = 'This is a required field.';
      }
    }

    if (isObject(validationSchema[name].validator)) {
      if (
        validationSchema[name].validator.compare &&
        files &&
        validationSchema[name].validator.compare(files[0])
      ) {
        const { validator } = validationSchema[name];
        // eslint-disable-next-line prefer-destructuring
        error = validator.error2;
      }
    }

    toBase64(files[0])
      .then(r => {
        console.log(r);
        setState(prevState => ({
          ...prevState,
          [name]: { value: r, error },
          [previewStateName]: {
            value: URL.createObjectURL(files[0]),
            error: '',
          },
        }));
        window.URL.revokeObjectURL(files[0]);
      })
      .catch(e => console.log(e));
  });

  return {
    handleOnChange,
    handleOnChangeFile,
    state,
    setIsDirty,
    setState,
    disable,
  };
};

export default useForm;
