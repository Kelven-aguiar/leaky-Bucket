import jwt from 'jsonwebtoken';
import { Context, Next } from 'koa';
import { users } from './data';

const secretKey = 'your_secret_key'; // Isso deve ser mantido seguro em um ambiente real

// Middleware para autenticar usuários usando JWT
export const authMiddleware = async (ctx: Context, next: Next) => {
  const authHeader = ctx.headers.authorization;

  if (!authHeader) {
    ctx.status = 401;
    ctx.body = 'Authorization header is missing';
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, secretKey) as { userId: string };
    const user = users[decoded.userId];

    if (!user) {
      ctx.status = 401;
      ctx.body = 'Invalid token';
      return;
    }

    // Armazena o usuário autenticado no contexto
    ctx.state.user = user;

    await next();
  } catch (error) {
    ctx.status = 401;
    ctx.body = 'Invalid token';
  }
};

// Função para gerar um token JWT para um usuário
export const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
};
