import { Module } from '@nestjs/common';
import { HealthCheckModule, LoggerModule } from '@app/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloFederationDriver } from '@nestjs/apollo';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
    }),
    HealthCheckModule,
    UsersModule,
    AuthModule,
    LoggerModule,
  ],
  controllers: [],
  providers: [],
})
export class AuthenticationModule {}
