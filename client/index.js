import React from 'react';
import Relay from 'react-relay';
import ReactDOM from 'react-dom';
import MobileDetect from 'mobile-detect';
import { browserHistory, applyRouterMiddleware, Router } from 'react-router';
import useRelay from 'react-router-relay';
import '../node_modules/react-mdl/extra/material';
import Route from './routes/Route';
import MobileRoute from './routes/MobileRoute';
import refreshRelayNetwork from './relay/refreshRelayNetwork';

require('babel-core/register');
require('babel-polyfill');

const token = localStorage.getItem('accessToken');
refreshRelayNetwork(token || '');
const rootNode = document.createElement('div');
document.body.appendChild(rootNode);
const detector = new MobileDetect(window.navigator.userAgent);
if (detector.mobile()) {
  ReactDOM.render(
    <Router history={browserHistory} routes={MobileRoute} render={applyRouterMiddleware(useRelay)} environment={Relay.Store} />,
    rootNode
  );
} else {
  ReactDOM.render(
    <Router history={browserHistory} routes={Route} render={applyRouterMiddleware(useRelay)} environment={Relay.Store} />,
    rootNode
  );
}