import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService, private readonly userService: UsersService){}
    async validateUser( { screenName, password }: User){
        const user = this.userService.findOne(screenName);
        return true;
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
