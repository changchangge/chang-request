const requeset = require('../lib/index');
const { default: request } = require('../lib/request');

request({ test: 'dasdsa' })
  .then()
  .catch((e) => console.log(e));
