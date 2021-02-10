import React, { memo } from 'react';

// components
import { Container, Button } from 'react-bootstrap';
import Input from 'components/Input';

// redux
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { createArticle } from './redux/actions';
import reducer from './redux/reducer';
import saga from './redux/saga';
// import { makeSelectLoggingIn, makeSelectErrors } from './redux/selectors';

// utils
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import useForm from 'hooks/useForm';
import { rules } from 'utils/validation';

// constants
const key = 'articleCreation';

function ArticleCreation({ onCreateArticle }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const stateSchema = {
    title: { value: '', error: '' },
    content: { value: '', error: '' },
  };

  const validationStateSchema = {
    title: {
      required: true,
    },
    content: {
      required: true,
    },
  };

  const { state, handleOnChange, disable } = useForm(
    stateSchema,
    validationStateSchema,
  );

  const handleCreateArticle = () => {
    onCreateArticle({
      title: state.title.value,
      content: state.content.value,
    });
  };

  return (
    <Container>
      <h1 className="mb-5">Write a New Article.</h1>
      <Input
        label="Title"
        type="text"
        name="title"
        placeholder="Title"
        value={state.title.value}
        error={state.title.error}
        className="mb-1"
        onChange={handleOnChange}
        onEnter={() => !disable && handleCreateArticle()}
      />
      <Input
        as="textarea"
        label="Content"
        type="text"
        name="content"
        placeholder="Content"
        value={state.content.value}
        error={state.content.error}
        className="mb-1"
        onChange={handleOnChange}
        onEnter={() => !disable && handleCreateArticle()}
      />
      <Button
        variant="primary"
        className="mx-auto"
        disabled={disable}
        onClick={handleCreateArticle}
      >
        Create
      </Button>
    </Container>
  );
}

// const mapStateToProps = createStructuredSelector({
//   loggingIn: makeSelectLoggingIn(),
// });

export const mapDispatchToProps = dispatch => ({
  onCreateArticle: data => dispatch(createArticle(data)),
});

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ArticleCreation);
