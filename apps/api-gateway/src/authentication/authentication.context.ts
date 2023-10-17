import { ServiceSettings } from '@app/common';
import { UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { app } from '../api-gateway.app';

export const authenticationContext = async ({ req }) => {
  try {
    const authClientService = app.get<ClientProxy>(
      ServiceSettings.AUTHENTICATION_SERVICE.serviceName,
    );
    const user = await lastValueFrom(
      authClientService.send('authenticate', {
        Authentication: req.headers?.authentication,
      }),
    );
    return { user };
  } catch (err) {
    throw new UnauthorizedException(err);
  }
};
