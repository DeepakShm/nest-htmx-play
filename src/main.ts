import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join, resolve } from 'path';
import * as hbs from 'express-handlebars';
import { IfEquals } from './helpers/ifEquals';

async function bootstrap() {
  // updating the nestfactory type to express application
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(resolve('./src/public')); // added the static assest "public" to app
  app.setBaseViewsDir(resolve('./src/views')); // set the base view(HTML) directory

  app.engine(
    'hbs',
    hbs.engine({
      extname: 'hbs',
      defaultLayout: 'layout_main',
      layoutsDir: resolve('./src/views/layouts'),
      partialsDir: resolve('./src/views/partials'),
      helpers: { IfEquals },
    }),
  );
  app.setViewEngine('hbs');

  await app.listen(42069);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
