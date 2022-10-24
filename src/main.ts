
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

// 실행 함수
async function bootstrap() {
  // 루트 모듈 호출
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    // option-whitelist : decorator가 설정돼있지 않은 property는 거른다
    whitelist: true,
    // decorator가 설정돼있지 않은 property에 대해서 에러 메세지를 보낸다
    forbidNonWhitelisted: true,
    // dto entity에 선언한 실제 타입으로 변환해준다.
    transform: true,
    transformOptions:{
      enableImplicitConversion:true
    }

  }));
  await app.listen(3000);
}
bootstrap();
