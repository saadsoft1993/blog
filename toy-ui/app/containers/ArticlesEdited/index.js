import React, { useEffect, memo } from 'react';

// components
import { Container, Table, Button } from 'react-bootstrap';

// redux
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { getArticles } from './redux/actions';
import reducer from './redux/reducer';
import saga from './redux/saga';
import { makeSelectArticles } from './redux/selectors';

// utils
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

// constants
const key = 'articlesEdited';

function ArticlesEdited({ onGetArticles, articles, history }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    onGetArticles();
  }, []);

  return (
    <Container>
      <h1>Edited Articles</h1>
      <br />
      <br />
      <Table striped bordered responsive>
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {articles &&
            articles.map(a => (
              <tr key={a.id}>
                <td>{a.title}</td>
                <td>
                  {a.status === 1
                    ? 'Approved'
                    : a.status === 2
                    ? 'Rejected'
                    : 'Pending'}
                </td>
                <td>
                  <Button onClick={() => history.push(`/article/${a.id}`)}>
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
}

const mapStateToProps = createStructuredSelector({
  articles: makeSelectArticles(),
});

export const mapDispatchToProps = dispatch => ({
  onGetArticles: () => dispatch(getArticles()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ArticlesEdited);
