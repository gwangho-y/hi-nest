import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';


// describe: 묘사하다
describe('MoviesService', () => {
  let service: MoviesService;
  // beforeEach: 테스트 전에 실행
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  // DB를 모두 지우는 function을 넣을 수 있다.
  afterAll(()=>{

  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });



  describe("getAll", ()=>{
    it("should return an array", ()=>{
      
      // service.getAll은 Movie 객체를 배열로 반환한다.
      const result = service.getAll();
      // result의 값은 배열이여야 한다.
      expect(result).toBeInstanceOf(Array);
    })
  })

  describe("getOne",()=>{
    
    it("should return a movie",() =>{
      service.create({
        title: "TestMovie",
        generes: ['test'],
        year: 2000
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined;
      expect(movie.id).toEqual(1);
    });
    it("should throw 404 error",()=>{
      try {
        service.getOne(999);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual("Movie with ID 999 not found.")
      }
    })
  });

  describe("deleteOne",()=>{
    it("deletes a movie", ()=>{
        service.create({
        title: "TestMovie",
        generes: ['test'],
        year: 2000
      });
      const allMovies = service.getAll();
      service.deleteOne(1);
      const afterDelete = service.getAll();
      expect(afterDelete.length).toBeLessThan(allMovies.length);
    })

    it("should return a 404", ()=>{
      try {
        service.deleteOne(999);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual("Movie with ID 999 not found.")
      }
    });
  });

  describe("create",()=>{
    it("should create a movie", ()=>{
      const beforeCreate =service.getAll().length;
      service.create({
        title: "TestMovie",
        generes: ['test'],
        year: 2000
      });
      
      
      const afterCreate =service.getAll().length;
      console.log(beforeCreate, afterCreate);
      expect(afterCreate).toBeGreaterThan(beforeCreate);


    });
  });
  

  describe("update", ()=>{
    it("should update a movie", ()=>{
      service.create({
        title: "TestMovie",
        generes: ['test'],
        year: 2000
      });

      service.update(1,{
        title:"Update test"
      });
      const movie = service.getOne(1);
      expect(movie.title).toEqual("Update test");

    });

    it("should throw a NotFoundException", ()=>{
      try {
        service.update(999,{});
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual("Movie with ID 999 not found.")
      }
    });

  });

});
