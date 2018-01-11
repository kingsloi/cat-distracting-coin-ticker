# Cat Distracting CryptoCoin Ticker

I have an asshole cat, who likes to wake my wife and I up what seems like every hour playing silly buggers. I also want to track my CryptoCoin Portfolio without the hassle of apps/extensions/websites, etc. So I decided to build this.

1. Every hour between 1am - 6am, move servo random amount, releasing varying amounts of cat treats (the good kind)
2. Use `https://github.com/RevaxZnarf/CoinTicker` to monitor my crypto portfolio

## Prereqresites 
* todo

## Installation (may be incomplete)
```
sudo apt-get install build-essential
sudo apt-get update
sudo apt-get dist-upgrade
sudo apt-get install python-yaml
npm install
```

## Setup cat distractor cronjob

```
$ crontab -e

0 1,2,3,4,5,6 * * * /home/pi/Projects/cat-distracting-coin-ticker/index.js
```

