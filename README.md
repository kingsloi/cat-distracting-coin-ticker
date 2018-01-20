# Catboard

I have an asshole cat, who likes to wake my wife and I up what seems like every hour playing silly buggers. I also want to add a smart display so I can code a personal dashboard (todo.), weather, crypto portfolio tracking, upcoming calendar events, etc.

1. Every hour between 1am - 6am, move servo random amount, releasing varying amounts of cat treats (the good kind)

## Prereqresites
* todo

## Installation
```
npm install
```

## Usage
**Treat**
- Sound alert, open motor once, close

```sudo node /home/pi/Projects/cat-distracting-coin-ticker/feeder.js --task=treat```

**Open**
- Open the feeder (i.e. for re-filling)

```sudo node /home/pi/Projects/cat-distracting-coin-ticker/feeder.js --task=open```

**Close**
- Close the feeder (i.e. after filling)

```sudo node /home/pi/Projects/cat-distracting-coin-ticker/feeder.js --task=close```

**Sweep**
- Sweep the motor. Good for testing out the range (i.e. to test your treat has enough room to escape
  when the `treat` method runs)

```sudo node /home/pi/Projects/cat-distracting-coin-ticker/feeder.js --task=sweep```

## Setup cat distractor cronjob
```
$ crontab -e

0 1,2,3,4,5,6 * * * /home/pi/Projects/cat-distracting-coin-ticker/feeder.js --task=treat
```

