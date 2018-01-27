import request from 'request-promise-native';
import { client as redis } from '../../lib/storage';
import logger from '../../lib/logger';

const loadJsonFile = require('load-json-file');

const cacheKey = 'history:timetowork';

const options = {
  uri: null,
  headers: {
    'User-Agent': 'kingsloi/catboard - Github',
  },
  json: true,
};

export const interval = '*/2 * * * *'; // See https://crontab.guru/ for help
export const perform = async () => {

  let config = loadJsonFile.sync('personal-config.json');
  let timetowork = 0;

  options.uri = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${config.locations.oak_ave.lat},${config.locations.oak_ave.long}&destinations=${config.locations.crown_point.lat},${config.locations.crown_point.long}&mode=driving&key=${config.keys.google_maps}`;

  let response = await request(options);

  timetowork = response.rows[0].elements[0].duration.value;

  timetowork = timetowork / 60; // seconds -> minutes;

  return [
    {
      target: 'TimeToWork',
      data: {
        value: timetowork,
      },
    },
  ];
};
