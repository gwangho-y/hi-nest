
import { PartialType } from "@nestjs/mapped-types";
import { IsNumber,IsString } from "class-validator";
import { CreateMovieDto } from './create-movie.dto';


// PartialType: 인스턴스로 사용한 클래스의 타입과 동일한 타입을 갖는다
export class UpdateMovieDto extends PartialType(CreateMovieDto){


}