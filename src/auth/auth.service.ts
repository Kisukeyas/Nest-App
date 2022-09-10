import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { use } from 'passport';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
const bcrypt = require('bcrypt');


@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService, private readonly userService: UsersService){}
    async validateUser( { screenName, password }: User){
        const user = await this.userService.findOne(screenName);
        // const isValid = await bcrypt.compare( password, user['password']);
        // if (!isValid) {
        //     throw new UnauthorizedException('Invalid credentials');
        // }
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
