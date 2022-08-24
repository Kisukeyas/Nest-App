import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { type } from 'os';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';

type PasswordOmitUser = Omit<User, 'password'>;

interface JWTPayload {
    userId: User['id'];
    screenName: User['screenName'];
}

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService, private userService: UsersService){}

    async validateUser(name: User['screenName'], pass: User['password']): Promise<PasswordOmitUser | null>{
        const user = await this.userService.findOne(name);
    }
}
