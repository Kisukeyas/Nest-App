import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ){}

    async create(user: User): Promise<User|undefined>{
        const { screenName, password } = user;
        const users = new User();
        users.screenName = screenName;
        users.password = password; 
        try {
            await this.userRepository.save(users);
        } catch (error) {
            throw new InternalServerErrorException();
        }

        return users;
    }

    async findAll(): Promise<User[]>{
        return await this.userRepository.find();
    }

    async findOne(userName: User['screenName']){
        const user = await this.userRepository.find({where: {screenName : userName}});
        return user
    }
}
