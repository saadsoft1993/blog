/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

// components
import RouteGuard from 'components/misc/RouteGuard';

// containers
import NotFoundPage from 'containers/NotFoundPage/Loadable';
// import Header from 'components/Header';
// import Footer from 'components/Footer';
import Registration from 'containers/Registration/loadable';
import Login from 'containers/Login/loadable';
import Dashboard from 'containers/Dashboard/loadable';
import ArticleCreation from 'containers/ArticleCreation/loadable';
import ArticleApproval from 'containers/ArticleApproval/loadable';
import ArticlesEdited from 'containers/ArticlesEdited/loadable';
import ArticleUpdation from 'containers/ArticleUpdation/loadable';

import GlobalStyle from '../../global-styles';

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

export default function App() {
  return (
    <AppWrapper>
      <Helmet titleTemplate="%s - React.js Boilerplate" defaultTitle="Toy">
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      <Switch>
        <RouteGuard exact path="/" component={Dashboard} isProtected />
        <RouteGuard path="/register" component={Registration} />
        <RouteGuard path="/login" component={Login} />
        <RouteGuard
          path="/article/new"
          component={ArticleCreation}
          isProtected
        />
        <RouteGuard
          path="/article-approval"
          component={ArticleApproval}
          isProtected
          onlyEditor
        />
        <RouteGuard
          path="/articles-edited"
          component={ArticlesEdited}
          isProtected
          onlyEditor
        />
        <RouteGuard
          path="/article/:id"
          component={ArticleUpdation}
          isProtected
        />
        <Route path="" component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </AppWrapper>
  );
}
