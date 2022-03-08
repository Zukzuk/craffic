import { NotFoundException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './users.entity';
import { BaseUserDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async getByEmail(email: string) {
    const user = await this.usersRepository.findOne({ email });

    if (user) return user;
    throw new NotFoundException(`User with this email does not exist`);
  }

  async create(dto: BaseUserDto) {
    const newUser = await this.usersRepository.create(dto);
    await this.usersRepository.save(newUser);
    return newUser;
  }
}
