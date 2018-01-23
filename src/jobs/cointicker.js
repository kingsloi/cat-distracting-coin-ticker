import request from 'request-promise-native';
import { client as redis } from '../../lib/storage';
import logger from '../../lib/logger';

const loadJsonFile = require('load-json-file');

const cacheKey = 'history:cointicker';

const options = {
  uri: null,
  headers: {
    'User-Agent': 'kingsloi/catboard - Github',
  },
  json: true,
};

export const interval = '*/30 * * * *'; // See https://crontab.guru/ for help
export const perform = async () => {

  let financials = loadJsonFile.sync('financials.json');

  let valueTotal = 0;
  let investmentTotal = 0;
  let coinUrl = 'https://api.cryptonator.com/api/ticker/%s-usd';

  for (let share of financials.portfolio) {
    let symbol = share.symbol.toLowerCase();

    options.uri = coinUrl.replace(/%[a-z]/, symbol);

    investmentTotal = investmentTotal + share.investment;

    let response = await request(options);

    let price = response.ticker.price;
    let count = share.count;

    let value = count * price;
    valueTotal = valueTotal + value;
  }

  let profit = valueTotal - investmentTotal;

  let gain = (profit / investmentTotal) * 100.0;

  let history = [];

  try {
    await redis.rpush(cacheKey, gain);
    history = await redis.lrange(cacheKey, 0, -1);
  } catch (err) {
    logger('error', 'cacheResponseProxy', err);
    throw err;
  }

  return [
    {
      target: 'CoinTicker',
      data: {
        value: history,
      },
    },
  ];
};
