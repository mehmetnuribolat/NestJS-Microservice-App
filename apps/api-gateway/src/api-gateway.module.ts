import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServiceSettings, LoggerModule } from '@app/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { authenticationContext } from './authentication';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      useFactory: (configService: ConfigService) => ({
        server: {
          context: authenticationContext,
        },
        gateway: {
          supergraphSdl: new IntrospectAndCompose({
            subgraphs: [
              {
                name: 'room-booking',
                url: configService.getOrThrow('ROOM_BOOKING_GRAPHQL_URL'),
              },
              {
                name: 'authentication',
                url: configService.getOrThrow('AUTHENTICATION_GRAPHQL_URL'),
              },
              {
                name: 'payment',
                url: configService.getOrThrow('PAYMENT_GRAPHQL_URL'),
              },
            ],
          }),
          buildService({ url }) {
            return new RemoteGraphQLDataSource({
              url,
              willSendRequest({ request, context }) {
                request.http.headers.set(
                  'user',
                  context.user ? JSON.stringify(context.user) : null,
                );
              },
            });
          },
        },
      }),
      inject: [ConfigService],
    }),
    ClientsModule.registerAsync([
      {
        name: ServiceSettings.AUTHENTICATION_SERVICE.serviceName,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.getOrThrow<string>('RABBITMQ_URI')],
            queue: ServiceSettings.AUTHENTICATION_SERVICE.queueName,
          },
        }),
        inject: [ConfigService],
      },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LoggerModule,
  ],
  controllers: [],
  providers: [],
})
export class ApiGatewayModule {}
