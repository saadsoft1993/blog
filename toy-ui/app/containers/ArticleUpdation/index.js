import React, { memo, useEffect } from 'react';

// components
import { Container, Button } from 'react-bootstrap';
import Input from 'components/Input';

// redux
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { getArticle, updateArticle } from './redux/actions';
import reducer from './redux/reducer';
import saga from './redux/saga';
import { makeSelectArticle } from './redux/selectors';

// utils
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import useForm from 'hooks/useForm';
import { rules } from 'utils/validation';

// constants
const key = 'articleUpdation';

function ArticleUpdation({ onGetArticle, article, onUpdateArticle, match }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    onGetArticle(match.params.id);
  }, []);

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

  const { state, setState, handleOnChange, disable } = useForm(
    stateSchema,
    validationStateSchema,
  );

  useEffect(() => {
    if (article) {
      setState({
        title: {
          value: article.title,
          error: '',
        },
        content: { value: article.content, error: '' },
      });
    }
  }, [article]);

  const handleUpdateArticle = () => {
    onUpdateArticle(match.params.id, {
      title: state.title.value,
      content: state.content.value,
    });
  };

  return (
    <Container>
      <h1 className="mb-5">Update Article.</h1>
      <Input
        label="Title"
        type="text"
        name="title"
        placeholder="Title"
        value={state.title.value}
        error={state.title.error}
        className="mb-1"
        onChange={handleOnChange}
        onEnter={() => !disable && handleUpdateArticle()}
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
        onEnter={() => !disable && handleUpdateArticle()}
      />

      {article && (
        <Button
          variant="primary"
          className="mx-auto"
          disabled={disable}
          onClick={handleUpdateArticle}
        >
          Update
        </Button>
      )}
    </Container>
  );
}

const mapStateToProps = createStructuredSelector({
  article: makeSelectArticle(),
});

export const mapDispatchToProps = dispatch => ({
  onGetArticle: id => dispatch(getArticle(id)),
  onUpdateArticle: (id, article) => dispatch(updateArticle(id, article)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ArticleUpdation);
