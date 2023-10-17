import * as Joi from 'joi';

export const paymentValidationSchema = Joi.object({
  PORT: Joi.number().required(),
  PORT_HTTP: Joi.number().required(),
  STRIPE_SECRET_KEY: Joi.string().required(),
});
