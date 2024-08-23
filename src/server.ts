import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';
import { authMiddleware, generateToken } from './auth';
import { users } from './data';

interface LoginRequestBody {
  userId: string;
}

const app = new Koa();
const router = new Router();

app.use(bodyParser());

// Rota de autenticação (login) para gerar um token
router.post('/login', (ctx) => {
  const { userId } = ctx.request.body as LoginRequestBody;

  if (!userId || !users[userId]) {
    ctx.status = 400;
    ctx.body = 'Invalid user';
    return;
  }

  const token = generateToken(userId);
  ctx.body = { token };
});

// Usar o middleware de autenticação em rotas protegidas
router.get('/protected', authMiddleware, (ctx) => {
  ctx.body = `Hello, ${ctx.state.user.name}`;
});

app.use(router.routes()).use(router.allowedMethods());

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
