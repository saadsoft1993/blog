import React, { memo } from 'react';

// components
import { Container, Button } from 'react-bootstrap';
import Input from 'components/Input';

// redux
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { login } from './redux/actions';
import reducer from './redux/reducer';
import saga from './redux/saga';
import { makeSelectLoggingIn, makeSelectErrors } from './redux/selectors';

// utils
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import useForm from 'hooks/useForm';
import { rules } from 'utils/validation';

// constants
const key = 'login';

function Login({ onLogin, history }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const stateSchema = {
    username: { value: '', error: '' },
    password: { value: '', error: '' },
  };

  const validationStateSchema = {
    username: {
      required: true,
    },
    password: {
      required: true,
      validator: rules.password,
    },
  };

  const { state, handleOnChange, disable } = useForm(
    stateSchema,
    validationStateSchema,
  );

  const handleLogin = () => {
    onLogin({
      username: state.username.value,
      password: state.password.value,
    });
  };

  return (
    <Container>
      <h1 className="mb-5">Login to the Blog</h1>
      <Input
        label="Username"
        type="text"
        name="username"
        placeholder="Username"
        value={state.username.value}
        error={state.username.error}
        className="mb-1"
        onChange={handleOnChange}
        onEnter={() => !disable && handleLogin()}
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
        onEnter={() => !disable && handleLogin()}
      />
      <Button
        variant="primary"
        disabled={disable}
        className="mb-1"
        onClick={handleLogin}
      >
        Login
      </Button>

      <p>OR</p>
      <Button
        variant="primary"
        className="mt-1"
        onClick={() => history.push('/register')}
      >
        Register
      </Button>
    </Container>
  );
}

const mapStateToProps = createStructuredSelector({
  loggingIn: makeSelectLoggingIn(),
  errors: makeSelectErrors(),
});

export const mapDispatchToProps = dispatch => ({
  onLogin: data => dispatch(login(data)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Login);
