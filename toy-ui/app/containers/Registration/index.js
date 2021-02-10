import React, { useState, useEffect, memo } from 'react';

// components
import { Container, Form, Button } from 'react-bootstrap';
import Input from 'components/Input';

// redux
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { register } from './redux/actions';
import reducer from './redux/reducer';
import saga from './redux/saga';
import { makeSelectRegistering, makeSelectErrors } from './redux/selectors';

// utils
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import useForm from 'hooks/useForm';
import { rules } from 'utils/validation';

// constants
const key = 'registration';

function Registration({ onRegister }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const stateSchema = {
    name: { value: '', error: '' },
    username: { value: '', error: '' },
    password: { value: '', error: '' },
    isEditor: { value: '', error: '' },
  };

  const validationStateSchema = {
    name: {
      required: true,
      validator: rules.name,
    },
    username: {
      required: true,
    },
    password: {
      required: true,
      validator: rules.password,
    },
    isEditor: {
      required: false,
    },
  };

  const { state, handleOnChange, disable } = useForm(
    stateSchema,
    validationStateSchema,
  );

  const handleRegister = () => {
    onRegister({
      name: state.name.value,
      username: state.username.value,
      password: state.password.value,
      is_editor: state.isEditor.value.length > 0,
    });
  };

  return (
    <Container>
      <h1 className="mb-5">Create an Account.</h1>
      <Input
        label="Name"
        type="text"
        name="name"
        placeholder="Name"
        value={state.name.value}
        error={state.name.error}
        className="mb-1"
        onChange={handleOnChange}
        onEnter={() => !disable && handleRegister()}
      />
      <Input
        label="Username"
        type="text"
        name="username"
        placeholder="Username"
        value={state.username.value}
        error={state.username.error}
        className="mb-1"
        onChange={handleOnChange}
        onEnter={() => !disable && handleRegister()}
      />
      <Input
        label="Password"
        type="password"
        name="password"
        placeholder="Password"
        value={state.password.value}
        error={state.password.error}
        className="mb-1"
        onChange={handleOnChange}
        onEnter={() => !disable && handleRegister()}
      />
      <Form.Label className="font-weight-bold mr-2">Is Editor</Form.Label>
      <Form.Check
        type="checkbox"
        className="d-inline mr-3"
        value="isEditor"
        name="isEditor"
        checked={state.isEditor.value.length > 0}
        onChange={handleOnChange}
      />
      <div>
        <Button
          variant="primary"
          className="mx-auto"
          disabled={disable}
          onClick={handleRegister}
        >
          Register
        </Button>
      </div>
    </Container>
  );
}

const mapStateToProps = createStructuredSelector({
  registering: makeSelectRegistering(),
  errors: makeSelectErrors(),
});

export const mapDispatchToProps = dispatch => ({
  onRegister: data => dispatch(register(data)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Registration);
