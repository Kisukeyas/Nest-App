import { Body, Controller, Delete, Get, Param, Post, Request, UseGuards, ValidationPipe} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
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
    @UseGuards(AuthGuard('jwt'))
    findOne(@Param('screenName') username: string){
        return this.usersService.findOne(username);
    }

    @Post()
    create( @Body(ValidationPipe) createUser: User){
        return this.usersService.create(createUser);
    }

    @Delete(':id')
    delete(@Param('id') id :number){
        return this.usersService.delete(id);
    }
}
