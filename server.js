const http = require('http');
const port = 3000;
const serveStatic = require('serve-static');
const connect = require('connect');
const nodemon = require('nodemon');

connect().use(serveStatic(__dirname)).listen(port, () => {
  console.log('El servidor esta levantado dentro del puerto ' + port);
  nodemon({
    script: 'api/index.js',
    ext: 'js'
  });
});