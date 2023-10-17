import { INestApplication } from '@nestjs/common';

let app: INestApplication;

const setAPIGatewayApp = (_app: INestApplication) => {
  app = _app;
};

export { app, setAPIGatewayApp };
