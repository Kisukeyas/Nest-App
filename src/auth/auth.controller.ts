import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}
        @Post()
        create(@Body(ValidationPipe) createUser: User){
            return this.authService.login(createUser);
        }
}
