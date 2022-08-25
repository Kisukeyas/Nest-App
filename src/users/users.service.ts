import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ){}

    async create(user: CreateUserDto): Promise<User|undefined>{
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
        return this.userRepository.find();
    }

    findOne(userName: User['screenName']): Promise<User | undefined>{
        return this.userRepository.findOne({ where: { screenName }});
    }
}
