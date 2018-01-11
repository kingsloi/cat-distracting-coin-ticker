# Cat Distracting CryptoCoin Ticker

I have an asshole cat, who likes to wake my wife and I up what seems like every hour playing silly buggers. I also want to track my CryptoCoin Portfolio without the hassle of apps/extensions/websites, etc. So I decided to build this.

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

0 1,2,3,4,5,6 * * * /home/pi/Projects/led-cointicker/index.js
```

