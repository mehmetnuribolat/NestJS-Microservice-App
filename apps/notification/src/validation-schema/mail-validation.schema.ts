import * as Joi from 'joi';

export const mailCredentialsValidationSchema = Joi.object({
  PORT: Joi.number().required(),
  SMTP_USER: Joi.string().required(),
  GOOGLE_OAUTH_CLIENT_ID: Joi.string().required(),
  GOOGLE_OAUTH_CLIENT_SECRET: Joi.string().required(),
  GOOGLE_OAUTH_REFRESH_TOKEN: Joi.string().required(),
});
