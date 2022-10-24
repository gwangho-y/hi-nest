import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './app.controller';



// module = 기능을 담당하는 것.
// ex) users 모듈이 있으면 로그인을 기능을 담당하는 모듈일 것이다.
@Module({
  imports: [MoviesModule],
  // 컨트롤러의 기본 역할을 url을 가져오고 함수를 실행하는 것. 라우터 같은 존재
  controllers: [AppController],
  providers: [],
})
// 앱 모듈은 루트 모듈
export class AppModule {}
