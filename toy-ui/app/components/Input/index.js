import React, { useState } from 'react';

// components
import { Form } from 'react-bootstrap';
import { MdVisibility, MdVisibilityOff, MdClear } from 'react-icons/md';

// styles
import Container from './style';

export default function Input({
  type,
  as = 'input',
  label,
  name,
  placeholder,
  options,
  value,
  disabled = false,
  disabledOptionsIndexes,
  disabledOption,
  onChange,
  onEnter,
  error,
  icon,
  clearIcon,
  onClear,
  size = 'rg',
  className,
  containerClassName,
}) {
  const [isPasswordVisible, setPasswordVisibility] = useState(false);

  const onPressEnter = e => {
    if (e.keyCode === 13 || e.which === 13) {
      onEnter();
    }
  };

  return (
    <Container
      label={label}
      isPlaceholderSelected={as === 'select' && options[0].value === value}
      size={size}
      className={containerClassName}
    >
      {label && <label className="mr-3">{label}</label>}

      <div className="position-relative mb-3">
        {as === 'select' ? (
          <Form.Control
            as={as}
            placeholder={placeholder}
            name={name}
            value={value}
            disabled={disabled}
            onChange={onChange}
            className={className}
          >
            {as === 'select' &&
              options.map((o, i) => (
                <option
                  disabled={
                    disabledOption && disabledOptionsIndexes.includes(i)
                  }
                  key={o.name || o.name === '' ? o.name : o}
                  value={o.value || o.value === '' ? o.value : o}
                  hidden={i === 0}
                >
                  {o.name || o.name === '' ? o.name : o}
                </option>
              ))}
          </Form.Control>
        ) : (
          <Form.Control
            as={as}
            type={isPasswordVisible ? 'text' : type}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
            onKeyUp={onPressEnter}
            disabled={disabled}
            className={className}
          />
        )}
        {icon && <div className="input-icon">{icon}</div>}
        {value && clearIcon && (
          <div className="clear-icon pointer">
            <MdClear size={20} color="#208BA6" onClick={onClear} />
          </div>
        )}
        {type === 'password' && (
          <div className="pass-visibility-toggle-icon pointer">
            {isPasswordVisible ? (
              <MdVisibilityOff
                size={20}
                color="#208BA6"
                onClick={() => setPasswordVisibility(false)}
              />
            ) : (
              <MdVisibility
                size={20}
                color="#208BA6"
                onClick={() => setPasswordVisibility(true)}
              />
            )}
          </div>
        )}
        {error && <Form.Text className="err-msg">{error}</Form.Text>}
      </div>
    </Container>
  );
}
