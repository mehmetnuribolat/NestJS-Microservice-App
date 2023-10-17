import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable, map, tap, catchError, of } from 'rxjs';
import { ServiceSettings } from '../../constants';
import { ClientProxy } from '@nestjs/microservices';
import { Reflector } from '@nestjs/core';
import { UserDto } from '@app/common/dtos';

@Injectable()
export class JwtAuthenticationGuard implements CanActivate {
  private readonly logger = new Logger(JwtAuthenticationGuard.name);

  constructor(
    @Inject(ServiceSettings.AUTHENTICATION_SERVICE.serviceName)
    private readonly authClient: ClientProxy,
    private readonly reflector: Reflector,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const jwt =
      context.switchToHttp().getRequest().cookies?.Authentication ||
      context.switchToHttp().getRequest().headers?.authentication;

    if (!jwt) {
      return false;
    }
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    this.authClient
      .send<UserDto>('authenticate', {
        Authentication: jwt,
      })
      .pipe(
        tap((res) => {
          if (roles) {
            for (const role of roles) {
              if (!res.roles?.includes(role)) {
                this.logger.error('User doesnt have any valid role!');
                throw new UnauthorizedException();
              }
            }
          }
          context.switchToHttp().getRequest().user = res;
        }),
        map(() => true),
        catchError((err) => {
          this.logger.error(err);
          return of(false);
        }),
      );
  }
}
