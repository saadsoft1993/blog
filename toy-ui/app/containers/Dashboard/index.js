import React, { useEffect, memo } from 'react';

// components
import { Container, Table, Button } from 'react-bootstrap';

// redux
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { logout } from 'containers/App/redux/actions';
import { getWriters } from './redux/actions';
import reducer from './redux/reducer';
import saga from './redux/saga';
import { makeSelectUser } from 'containers/App/redux/selectors';
import { makeSelectWriters } from './redux/selectors';

// utils
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

// constants
const key = 'dashboard';

function Dashboard({ user, onGetWriters, writers, onLogout, history }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    onGetWriters();
  }, []);

  console.log(user, logout);

  return (
    <Container>
      <div className="row justify-content-end mt-4 mb-5">
        <Button className="mr-2" onClick={() => history.push('/article/new')}>
          Create
        </Button>
        {user.is_editor && (
          <>
            <Button
              className="mr-2"
              onClick={() => history.push('/article-approval')}
            >
              Articles Approval
            </Button>
            <Button
              className="mr-2"
              onClick={() => history.push('/articles-edited')}
            >
              Articles Edited
            </Button>
          </>
        )}

        <Button onClick={onLogout}>Logout</Button>
      </div>
      <h1>Dashboard</h1>
      <br />
      <br />
      <Table striped bordered responsive>
        <thead>
          <tr>
            <th>Writer</th>
            <th>Total articles written</th>
            <th>Articles written in last 30 days</th>
          </tr>
        </thead>
        <tbody>
          {writers &&
            writers.map(post => (
              <tr key={post.id}>
                <td>{post.username}</td>
                <td>{post.article}</td>
                <td>{post.last_30_days}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
}

const mapStateToProps = createStructuredSelector({
  writers: makeSelectWriters(),
  user: makeSelectUser(),
});

export const mapDispatchToProps = dispatch => ({
  onGetWriters: () => dispatch(getWriters()),
  onLogout: () => dispatch(logout()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Dashboard);
