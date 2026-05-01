import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { GlobalExceptionFilter } from './common/filters/http-expection.filter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalFilters(new GlobalExceptionFilter())
  //app.enableCors({origin:'http://localhost:5173'});
  app.useGlobalPipes(new ValidationPipe({transform:true, whitelist:true}))
  await app.listen(3000);
}
bootstrap();
