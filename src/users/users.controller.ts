import { Body, Controller, Get, Param, Post, ValidationPipe} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @Get()
    findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Get(':screenName')
    findOne(@Param('screenName') username :string) {
        return this.usersService.findOne(username);
    }

    @Post()
    create( @Body(ValidationPipe) createUser: CreateUserDto): Promise<User|undefined>{
        return this.usersService.create(createUser);
    }
}
