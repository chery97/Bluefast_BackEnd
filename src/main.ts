import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from './app.module';
import { BaseAPIDocument } from "./Util/swagger.document";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new BaseAPIDocument().initializeOptions();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(8000, () => {
    console.log('running on port 8000');
  });
}
bootstrap();
