import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ApiKeyGuard } from './common/guards/api-key/api-key.guard';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  app.enableCors({
    origin: '*', // or restrict to specific origin(s)
    methods: ['GET', 'POST'],
  });
  app.useGlobalGuards(new ApiKeyGuard(configService));
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/', // This makes images accessible via /uploads/image.jpg
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
