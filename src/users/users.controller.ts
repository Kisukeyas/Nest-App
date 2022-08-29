import { Body, Controller, Get, Param, Post, ValidationPipe} from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @Get()
    findAll(){
        return this.usersService.findAll();
    }

    @Get(':screenName')
    findOne(@Param('screenName') username :string){
        return this.usersService.findOne(username);
    }

    @Post()
    create( @Body(ValidationPipe) createUser: User){
        return this.usersService.create(createUser);
    }
}
