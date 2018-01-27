import request from 'request-promise-native';
import { client as redis } from '../../lib/storage';
import logger from '../../lib/logger';

const loadJsonFile = require('load-json-file');

const cacheKey = 'history:locationtemp';

const options = {
  uri: null,
  headers: {
    'User-Agent': 'kingsloi/catboard - Github',
  },
  json: true,
};

export const interval = '*/30 * * * *'; // See https://crontab.guru/ for help
export const perform = async () => {

  let config = loadJsonFile.sync('personal-config.json');
  let temperature = '';

  options.uri = `http://api.wunderground.com/api/4fca5c172ea05712/conditions/q/IN/Gary.json`;

  let response = await request(options);

  temperature = `${response.current_observation.temp_f}°F/${response.current_observation.temp_c}°C (${response.current_observation.icon})`;

  return [
    {
      target: 'LocationTemp',
      data: {
        value: temperature,
      },
    },
  ];
};
