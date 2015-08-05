'use strict';

import React, { Component } from 'react';
import ReactRouter, {Route, DefaultRoute, RouteHandler, Link}  from 'react-router';
import AuthenticatedApp from './components/AuthenticatedApp.react';
import TagComponent from './components/TagComponent.react';
import Login from './components/Login.react';
import Home from './components/Home.react';
import RouterContainer from './services/RouterContainer';
import LoginActions from './actions/LoginActions';


var routes = (
    <Route handler={AuthenticatedApp}>
        <DefaultRoute handler={Home}/>
        <Route name="login" handler={Login}/>
        <Route name="tags"  handler={TagComponent}/>
        <Route name="home" path="/" handler={Home}/>
    </Route>
);

RouterContainer.set(ReactRouter.create({routes}));

let user = localStorage.getItem('user');
if (user) {
    LoginActions.loginUser(user);
}

ReactRouter.run(routes, function (Handler) {
    React.render(<Handler/>, document.body);
});

