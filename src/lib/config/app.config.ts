import Joi from '@hapi/joi';
import { registerAs } from '@nestjs/config';

export const AppConfig = registerAs('app', () => ({
  isDev: process.env.NODE_ENV !== 'production',
  isEnableDocs: process.env.ENABLE_DOCS === 'true',
  documentPath: process.env.DOCUMENT_PATH,
  useMockData: process.env.USE_MOCK_DATA === 'true',
  isDebug: process.env.DEBUG === 'true',
  appKey: process.env.APP_KEY,
  option: process.env.OPTION,
  bufferTime: +process.env.BUFFER_TIME,
}));

export const AppConfigValidationSchema = {
  APP_KEY: Joi.string().required(),
};
