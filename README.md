# nxtp-js

nxtp-js is a JavaScript implementation of the nxtp library, developed for the ZX Spectrum Next computer. It provides a convenient method for configuring the local time on vintage computers that possess both a Real Time Clock (RTC) and a network interface.

This library is inspired by the original [nxtp](https://github.com/Threetwosevensixseven/nxtp) project for the ZX Spectrum Next.



## Installation

To use this project, you need to have Node.js version 18 or higher installed. As an alternative you can use nvm.


```shell
git clone https://github.com/syroegkin/nxtp-js.git
nvm use # if you use nvm
npm install
npm run build
npm start
```

By default, the library listens on port 12300. However, you can configure a different port by setting the environment variable **PORT**:

```shell
PORT=12500 npm start
```

Alternatively you can use provided docker-compose file:
```shell
docker-compose up -d
```

There is an available pre-built Docker image that you can utilize:
```shell
docker pull ghcr.io/syroegkin/nxtp-js:latest
```

Docker-compose uses this pre-built image by default, but if you wish, you can build it by yourself:
* Open docker-compose.yml.
* Comment out the image: line.
* Uncomment the build: line.


The public time server is available at 
* http://time.zx.in.net:12300
* http://time1.zx.in.net:12300

On your ZX Spectrum Nextr, you have the option to configure fallback servers. In the event that one server is unavailable, the system will automatically attempt to switch to a backup server.

Your `autoexec.bas` file may look like this:

```basic
   5 REM First server
  10 ON ERROR GO TO 50
  20 .nxtp time.zx.in.net 12300 -z=W.EuropeStandardTime
  30 ON ERROR
  40 GO TO 140
  45 REM Second server
  50 ON ERROR GO TO 90
  55 PAUSE 100
  60 .nxtp time.nxtel.org 12300 -z=W.EuropeStandardTime
  70 ON ERROR
  80 GO TO 140
  85 REM Third server
  90 ON ERROR GO TO 130
  95 PAUSE 100
 100 .nxtp time1.zx.in.net 12300 -z=W.EuropeStandardTime
 110 ON ERROR
 120 GO TO 140
 130 PRINT: PRINT "Can not fetch time"
 140 REM the rest of the code goes here...
9997 GO TO 9999
9998 SAVE "c:/nextzxos/autoexec.bas" LINE 0
9999 ERASE

```

ZX Spectrum Next is a trademark of SpecNext Ltd.