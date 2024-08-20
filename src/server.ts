import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';

const app = new Koa();
const router = new Router();

router.get('/', (ctx) => {
  ctx.body = 'Hello, Woovi!';
});

app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
