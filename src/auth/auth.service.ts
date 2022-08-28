import bcrypt = require('bcrypt')

import { Injectable } from '@nestjs/common';

import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';


type PasswordOmitUser = Omit<User, 'password'>;

interface JwtPayload {
    userId: User['id'];
    screenName: User['screenName'];
}

@Injectable()
export class AuthService {


    async validateUser(name: User['screenName'], pass: User['password']): Promise<PasswordOmitUser | void>{



        }}