import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

@Module({
    controllers:[MoviesController],

    // provider에 MoviesService를 임포트하고 MoviesController에 inject 된다.
    providers:[MoviesService]
})
export class MoviesModule {}
