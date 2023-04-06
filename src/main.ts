import {
  INestApplication,
  Logger,
  LogLevel,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import bodyParse from 'body-parser';
import { formatRFC3339 } from 'date-fns';
import { AppModule } from './app.module';
import { userRequest } from './lib/middlewares/user';
const packageJson = require('../package.json');

// override date tostring
Date.prototype.toISOString = function() {
  return formatRFC3339(this, { fractionDigits: 3 });
};

const logger: LogLevel[] = ['log', 'error', 'debug'];
const log = new Logger('STARTUP');

export async function bootstrap(port: number) {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
    logger,
  });
  // app.use(responseTime());
  app.use(userRequest);
  app.use(bodyParse.json({ limit: '100mb' }));
  app.setGlobalPrefix('/api');
  app.enableCors({
    allowedHeaders: [
      'Content-Type, Authorization, Content-Length, X-Requested-With, app-key',
    ],
  });
  app.useGlobalPipes(
    new ValidationPipe({ transform: true, forbidUnknownValues: true }),
  );

  const configService = app.get(ConfigService);
  const isEnableDocs = configService.get('app.isEnableDocs');
  const documentPath = configService.get('app.documentPath');

  if (isEnableDocs) {
    setupApiDocs(documentPath, app);
  }

  await app.listen(port);
  log.log('App start running on ' + (await app.getUrl()));
}

/**
 * setup api docs pages
 * @param documentPath path tới docs
 * @param app nestjs app
 */
function setupApiDocs(documentPath: string, app: INestApplication) {
  log.log('có bật hiện api docs');
  const options = new DocumentBuilder()
    .setTitle('Token Xác Thực API Document')
    .setDescription('Token Xác Thực API Document')
    .setVersion(packageJson.version);

  if (documentPath && documentPath.trim().length > 0) {
    options.addServer('/' + documentPath);
  }

  const document = SwaggerModule.createDocument(app, options.build());
  SwaggerModule.setup('_docs', app, document);
}
