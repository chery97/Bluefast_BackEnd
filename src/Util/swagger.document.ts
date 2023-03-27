import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export class BaseAPIDocument {
  public builder = new DocumentBuilder();

  public initializeOptions() {
    return this.builder
        .setTitle('Bluefast API')
        .setDescription('Bluefast API 입니다.')
        .setVersion('1.0.0')
        .addTag('swagger')
        .build();
  }
}