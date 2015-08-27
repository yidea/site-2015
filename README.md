README
=================

A boilerplate for basic APP + API node.js server  

### FE Stack

- Client: React + Alt + Stylus + React Router 
- Server: Express + Handlebars 
- Build: Webpack + Babel
- Data: Firebase
- Lint: Eslint

### Development

```
$ git submodule add git@github.com:user 
$ git submodule update --init
$ npm install
$ npm run hot or npm run dev
```

Testing http://localhost:3000

### Production

```
$ npm install --production
$ npm run build
$ npm install pm2 -g
$ NODE_ENV=production pm2 start server/index.js
```

### TODO

- Flux: Firebase to store, bluebird promise, mixin?
- Server: add API cache, cors
- Tests infrastructure
- Isomophic infrastructure
