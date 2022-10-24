import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entites/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';


@Controller('movies')
export class MoviesController {


    constructor(private readonly moviesService: MoviesService){}
    @Get()
    getAll(): Movie[]{
        return this.moviesService.getAll();
    }

    
    @Get(":id")
    getOne(@Param('id') movieId:number){
        
        console.log(typeof movieId);
        
        return this.moviesService.getOne(movieId);
    }

    @Post()
    create(@Body() movieData: CreateMovieDto){

        console.log(movieData.year);
        
        
        return this.moviesService.create(movieData);
    }

    @Delete("/:id")
    remove(@Param('id') movieId:number){
        return this.moviesService.deleteOne(movieId);
    }
    
    // @Put은 모든 리소스 업데이트
    // @Patch는 일부 리소스 업데이트
    @Patch('/:id')
    patch(@Param('id') movieId:number, @Body() updateData: UpdateMovieDto){
        return this.moviesService.update(movieId, updateData);
    }


    
}
