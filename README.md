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

The public time server is available at http://time.zx.in.net:12300

ZX Spectrum Next is a trademark of SpecNext Ltd.