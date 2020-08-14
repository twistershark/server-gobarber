import { container } from 'tsyringe';

import '@modules/users/providers';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepositories';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

/**
 * Importamos a interface para forçar que a dependência informada como segundo
 * parâmetro ali seja no formato daquela interface.
 *
 * Esse registerSingleton recebe dois parâmetros. O primeiro é o id/nome daquele
 * registro e o segundo é o dado em si.
 */

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
