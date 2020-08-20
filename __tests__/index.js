const requeset = require('../lib/index');
const { default: request } = require('../lib/request');

request(
  ...[
    { controller: 'test', middlewares: (arr = []) => arr.reverse() },
    ,
    ,
    (middlewares = [
      (a) => {
        console.log(a);
      },
      (a) => {
        console.log(a);
      },
    ]),
  ]
)
  .then()
  .catch((e) => console.log(e));
