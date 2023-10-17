import * as Joi from 'joi';

export const authenticationValidationSchema = Joi.object({
  MONGODB_CONNECTION_URI: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRATION: Joi.string().required(),
  HTTP_PORT: Joi.number().required(),
  TCP_PORT: Joi.number().required(),
});
