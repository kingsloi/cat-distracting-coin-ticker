import React from 'react';
import ReactDOM from 'react-dom';

import socketIOClient from 'socket.io-client';

import '../styles/default.scss';

import Dashboard from '../widgets/dashboard';
import NumberWidget from '../widgets/number/widget';
import PingWidget from '../widgets/ping/widget';
import BuildStatusWidget from '../widgets/build-status/widget';
import SparklineWidget from '../widgets/sparkline/widget';
import ProgressWidget from '../widgets/progress/widget';

const socket = socketIOClient(`http://${window.location.host}`);

ReactDOM.render(
  <Dashboard>
    <SparklineWidget name="CoinTicker" title="Portfolio" format="0.0a" metric="%" />
    <NumberWidget name="TimeToWork" title="Time to CP" format="0" metric="mins" />
    <NumberWidget name="LocationTemp" title="Current Weather" />
  </Dashboard>,
  document.getElementById('content'),
);
