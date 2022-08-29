import { Injectable } from '@nestjs/common';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {
    async login(user: User){
        return user;
    }
}
