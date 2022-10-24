import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  //beforeEach에서 beforeAll로 변경하면 테스팅을 시작하기 전에 새 어플리케이션을 만든다
  // beforeAll로 설정해주지 않으면 밑에 POST에서 movie 객체를 만들어도 다른 테스트때는 이미 DB는 비어있는 상태이기 때문이다.
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    // app.ts에서 설정해준 그대로 파이프를 설정해준다
    // 아니면 id 값은 string으로 받아서 오류 난다.
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
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('무비 api에 어서오세요');
  });

  describe("/movies", () =>{
    it("/movies (GET)",()=>{
      // request는 supertest에 정의돼있다.
      // getHttpServer : localhost:3000같은거 안 써도 된다.
      return request(app.getHttpServer())
        .get("/movies")
        .expect(200)
        .expect([])
    });
    it("POST 201" ,()=>{
      // 201은 생성됐다는 뜻으로 POST할때 데이터 같이 보내준다.
      return request(app.getHttpServer())
      .post("/movies")
      .send({
        title: "test",
        year:2000,
        generes:['test']
      })
      .expect(201)
    });

    it("POST 400" ,()=>{
      // 201은 생성됐다는 뜻으로 POST할때 데이터 같이 보내준다.
      return request(app.getHttpServer())
      .post("/movies")
      .send({
        title: "test",
        year:2000,
        generes:['test'],
        other:"thing"
      })
      .expect(400)
    })

    it("DELETE",()=>{
      return request(app.getHttpServer())
      .delete("/movies")
      .send({
        title: "test",
        year:2000,
        generes:['test']
      })
      .expect(404)
    });
  })

  describe('/movies/:id',()=>{
    it('GET 200',()=>{
      return request(app.getHttpServer())
      .get("/movies/1")
      .expect(200);
    });
    it('GET 404',()=>{
      return request(app.getHttpServer())
      .get("/movies/999")
      .expect(404);
    });    
    
    it('PATCH 200',()=>{
      return request(app.getHttpServer()).patch('/movies/1')
        .send({ title:"Updated Test"})
        .expect(200);
    });

    it('DELETE 200', ()=>{
      return request(app.getHttpServer())
        .delete('/movies/1')
        .expect(200)
    });
  });

  
});
