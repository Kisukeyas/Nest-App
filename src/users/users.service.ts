import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

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
        users.password = await bcrypt.hash(password, 12) ; 
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
        if (!user) {
            throw new NotFoundException('ユーザーが見つかりません')
        }
        return user
    }

    async delete(id: User['id']){
        return await this.userRepository.delete(id);
    }
}
