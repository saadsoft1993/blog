import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// redux
import { makeSelectUser } from 'containers/App/redux/selectors';

const RouteGuard = ({
  isProtected = false,
  onlyEditor = false,
  user,
  component: Component,
  ...rest
}) => {
  console.log(onlyEditor);
  return (
    <Route
      {...rest}
      render={props => {
        if (isProtected) {
          if (user) {
            if (!onlyEditor || (onlyEditor && user.is_editor)) {
              return <Component {...props} />;
            } else if (onlyEditor && !user.is_editor) {
              return <Redirect to={{ pathname: '/' }} />;
            }
          } else {
            return <Redirect to={{ pathname: '/login' }} />;
          }
        } else {
          return user ? (
            <Redirect
              to={{
                pathname: '/',
              }}
            />
          ) : (
            <Component {...props} />
          );
        }
      }}
    />
  );
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(RouteGuard);
