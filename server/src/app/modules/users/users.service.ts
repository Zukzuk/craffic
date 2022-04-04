import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto, UpdateUserDto, PatchUserDto } from './dtos/user.dto';
import {
  CollectionNotFoundException,
  CustomNotFoundException,
  DefaultNotFoundException,
} from '../../exceptions/notFound.exception';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async create(userData: CreateUserDto) {
    const newUser = await this.usersRepository.create(userData);
    const savedUser = await this.usersRepository.save(newUser);

    if (savedUser) return savedUser;
    throw new InternalServerErrorException();
  }

  async findAll() {
    const users = await this.usersRepository.find();

    if (users) return users;
    throw new CollectionNotFoundException();
  }

  async getById(id: string) {
    const user = await this.usersRepository.findOne({ id });

    if (user) return user;
    throw new DefaultNotFoundException(id, 'User');
  }

  async getByEmail(email: string) {
    const user = await this.usersRepository.findOne({ email });

    if (user) return user;
    throw new CustomNotFoundException(
      `User with email: ${email} does not exist`,
    );
  }

  async updateOrPatch(
    id: string,
    userData: UpdateUserDto | PatchUserDto,
    requesterId: string,
  ) {
    const modifiedUser = await this.usersRepository.create({
      id,
      ...userData,
      lastChangedBy: requesterId,
    });

    /*
    Saves a given entity or array of entities. If the entity already exists in the database, it is updated.
    If the entity does not exist in the database, it is inserted. It saves all given entities in a single transaction.
    */
    const savedUser = await this.usersRepository.save(modifiedUser);

    if (savedUser) return savedUser;
    throw new DefaultNotFoundException(id, 'User');
  }

  async remove(id: string) {
    return await this.usersRepository.delete({ id });
  }
}
