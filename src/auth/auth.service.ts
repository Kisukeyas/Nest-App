import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from "bcrypt";


@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService, private readonly userService: UsersService){}
    async validateUser( user: User){
        const users = await this.userService.findOne(user.screenName);
        console.log(users['password']);
        const isValid = await bcrypt.compare(user.password, users['password']);
        if (!isValid) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return user;
    }
    async login(user: User){
        if(await this.validateUser(user)){
            const payload = { username: user.screenName }
            return {
                'access_token': this.jwtService.sign(payload)
            }
        }
    }
}
