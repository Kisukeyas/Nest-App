import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService){}
    async login(user: User){
        const payload = { username: user.screenName }
        return {
            'access_token': this.jwtService.sign(payload)
        }
    }
}
