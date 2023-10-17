import * as Joi from 'joi';

export const roomBookingValidationSchema = Joi.object({
  MONGODB_CONNECTION_URI: Joi.string().required(),
  PORT: Joi.number().required(),
  AUTH_HOST: Joi.string().required(),
  PAYMENTS_HOST: Joi.string().required(),
  AUTH_PORT: Joi.number().required(),
  PAYMENTS_PORT: Joi.number().required(),
});
