import * as Joi from '@hapi/joi';
import { registerAs } from '@nestjs/config';

export const UserConfig = registerAs('user', () => ({
  appKey: process.env.APP_KEY,
}));

export const UserConfigValidationSchema = {
  APP_KEY: Joi.string().required(),
};
