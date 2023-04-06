import * as Joi from '@hapi/joi';
import { registerAs } from '@nestjs/config';

export const DBConfig = registerAs('dbConfig', () => ({
  host: process.env.PG_HOST,
  port: +process.env.PG_PORT,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  app_name: process.env.APP_NAME,
}));

export const DbValidationSchema = {
  PG_HOST: Joi.string().required(),
  PG_PORT: Joi.string().required(),
  PG_USER: Joi.string().required(),
  PG_PASSWORD: Joi.string()
    .required()
    .allow(''),
  PG_DATABASE: Joi.string().required(),
};
