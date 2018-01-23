import React from 'react';
import ReactDOM from 'react-dom';

import '../styles/default.scss';

import Dashboard from '../widgets/dashboard';
import NumberWidget from '../widgets/number/widget';
import PingWidget from '../widgets/ping/widget';
import BuildStatusWidget from '../widgets/build-status/widget';
import SparklineWidget from '../widgets/sparkline/widget';
import ProgressWidget from '../widgets/progress/widget';

ReactDOM.render(
  <Dashboard>
    <SparklineWidget name="CoinTicker" title="Users" format="0.0a" metric="%" />
  </Dashboard>,
  document.getElementById('content'),
);
