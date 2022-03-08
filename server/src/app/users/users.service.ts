import { NotFoundException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/users.entity';
import { BaseUserDto } from './dtos/users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async create(userData: BaseUserDto) {
    const newUser = await this.usersRepository.create(userData);
    await this.usersRepository.save(newUser);

    return newUser;
  }

  async getById(id: number) {
    const user = await this.usersRepository.findOne({ id });

    if (user) return user;
    throw new NotFoundException(`User with id: ${id} does not exist`);
  }

  async getByEmail(email: string) {
    const user = await this.usersRepository.findOne({ email });

    if (user) return user;
    throw new NotFoundException(`User with email: ${email} does not exist`);
  }
}
