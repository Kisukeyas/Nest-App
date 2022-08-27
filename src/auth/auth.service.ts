import bcrypt = require('bcrypt')

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { use } from 'passport';

type PasswordOmitUser = Omit<User, 'password'>;

interface JwtPayload {
    userId: User['id'];
    screenName: User['screenName'];
}

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService, private userService: UsersService){}

    async validateUser(name: User['screenName'], pass: User['password']): Promise<PasswordOmitUser | void>{
        const user = await this.userService.findOne(name);

        if (user && bcrypt.compareSync(pass, user.password)) {
            const { password } = user;

            return result;
        }
        return null
    }

    async login(user: PasswordOmitUser) {
        // jwtにつけるPayload情報
        const payload: JwtPayload = { username: user.screenName };
    
        return {
          access_token: this.jwtService.sign(payload)
}
    }}