import { Controller } from '@nestjs/common';
import { Get } from '@nestjs/common/decorators/http/request-mapping.decorator';

@Controller('')
export class AppController {
    @Get()
    home(){
        return '무비 api에 어서오세요';
    }
}
