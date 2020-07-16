import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '../errors/AppError';

import authConfig from '../config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  // Validação do token JWT

  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  // Bearer aopdkwpodk
  /**
   * Se eu não for usar uma variável da desestruturação
   * podemos deixar em branco e só separarmos por vírgula.
   * Assim o JS já entende que não vamos utilizar aquela variável.
   */
  const [, token] = authHeader.split(' ');

  /**
   * Como o verify vai retornar um Error caso não seja válido
   * Podemos colocar essa função dentro de um Try/Catch.
   * Dessa forma, se ele falhar, podemos retornar uma mensagem de erro
   * customizada.
   */
  try {
    const decoded = verify(token, authConfig.jwt.secret);

    /**
     * Se quisermos forçar uma variável a ser de um tipo
     * podemos usar o "as *INTERFACE*"
     */
    const { sub } = decoded as TokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}
