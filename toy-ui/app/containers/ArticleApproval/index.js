import React, { useEffect, memo } from 'react';

// components
import { Container, Table, Button } from 'react-bootstrap';

// redux
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { getArticles, updateApprovalStatus } from './redux/actions';
import reducer from './redux/reducer';
import saga from './redux/saga';
import { makeSelectArticles } from './redux/selectors';

// utils
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

// constants
const key = 'articalApproval';

function ArticalApproval({ onGetArticles, articles, onUpdateApprovalStatus }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    onGetArticles();
  }, []);

  return (
    <Container>
      <h1>Approval</h1>
      <br />
      <br />
      <Table striped bordered responsive>
        <thead>
          <tr>
            <th>Title</th>
            <th>Action</th>
            {/* <th>Articles written in last 30 days</th> */}
          </tr>
        </thead>
        <tbody>
          {articles &&
            articles
              .filter(a => a.status === null)
              .map(a => (
                <tr key={a.id}>
                  <td>{a.title}</td>
                  <td>
                    <Button
                      variant="success"
                      onClick={() =>
                        onUpdateApprovalStatus(a.id, { status: 1 })
                      }
                    >
                      Approve
                    </Button>{' '}
                    <Button
                      variant="danger"
                      onClick={() =>
                        onUpdateApprovalStatus(a.id, { status: 2 })
                      }
                    >
                      Reject
                    </Button>{' '}
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
  onUpdateApprovalStatus: (id, status) =>
    dispatch(updateApprovalStatus(id, status)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ArticalApproval);
