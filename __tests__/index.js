const requeset = require('../lib/index');
const { default: request } = require('../lib/request');
const { isConstructorDeclaration } = require('typescript');

const middleware_first = (options) => async (ctx, next) => {
  console.log('==========');
  console.log(ctx);
  console.log('==========');
  await next();
  console.log('next======');
  console.log(options);
  console.log('next======');
};

const middleware_second = (options) => async (ctx, next) => {
  console.log('++++++++++');
  console.log(ctx);
  console.log('++++++++++');
  await next();
  console.log('next++++++');
  console.log(options);
  console.log('next++++++');
};

request(
  {
    controller: () => {
      console.log('Controll');
    },
  },
  { test: 'kkkk' },
  { options: 'options' },
  [middleware_first(), middleware_second()]
)
  .then((message) => {
    console.log('message');
    console.log(message);
    console.log('message');
  })
  .catch((e) => console.log(e));
