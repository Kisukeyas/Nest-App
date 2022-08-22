import { Body, Controller, Get, Post, ValidationPipe} from '@nestjs/common';
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

    @Post()
    create( @Body(ValidationPipe) createUser: CreateUserDto): Promise<User|void>{
        return this.usersService.create(createUser);
    }
}
