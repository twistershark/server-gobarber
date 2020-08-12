import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });
    // Procura se existe um usuário com aquele email
    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
      // É legal sempre retornarmos a mesma mensagem de erro.
      // Dessa forma, dificultamos se uma pessoa tiver chutando. Ela não saberá qual está errado.
    }

    const passwordMatched = await compare(password, user.password);
    // Verifica se a senha não criptografada que foi inserida
    // corresponde com a senha que foi criptografada e está no banco de dados

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    /**
     * Ao criarmos um token, o primeiro argumento é o payload.
     * Nunca enviar dados sensiveis no payload pois não é seguro.
     * O segundo parâmetro é uma chave única da nossa aplicação.
     * Podemos inserir qualquer coisa nessa chave, mas pra ficar mais seguro
     * é bom usarmos o MD5 online e gerarmos um hash lá escrevendo uma mensagem aleatória
     * O terceiro parâmetro são configurações do nosso token.
     * Sempre colocaremos o subject: user.id; para sabermos a qual usuario gerou aquele token
     */

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
