import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import UserEntity from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import {
  CreateUserDto,
  UpdateUserDto,
  PatchUserDto,
  ResponseUserDto,
  GetByEmailUserDto,
} from './dtos/user.dto';
import {
  CollectionNotFoundException,
  CustomNotFoundException,
  DefaultNotFoundException,
} from '../../exceptions/notFound.exception';

@Injectable()
export default class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  // CRUD //

  async create(userData: CreateUserDto): Promise<ResponseUserDto> {
    const newUser = await this.usersRepository.create(userData);
    const savedUser = await this.usersRepository.save(newUser);

    if (savedUser) return new ResponseUserDto(savedUser);
    throw new InternalServerErrorException();
  }

  async findAll(): Promise<ResponseUserDto[]> {
    const users = await this.usersRepository.find();

    if (users) return users.map((user) => new ResponseUserDto(user));
    throw new CollectionNotFoundException();
  }

  async findOne(id: string): Promise<ResponseUserDto> {
    const user = await this.usersRepository.findOne({ id });

    if (user) return new ResponseUserDto(user);
    throw new DefaultNotFoundException(id, 'User');
  }

  async updateOrPatch(
    id: string,
    userData: UpdateUserDto | PatchUserDto,
    requesterId: string,
  ): Promise<ResponseUserDto> {
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

    if (savedUser) return new ResponseUserDto(savedUser);
    throw new DefaultNotFoundException(id, 'User');
  }

  async delete(id: string): Promise<DeleteResult> {
    return this.usersRepository.delete({ id });
  }

  // CUSTOM //

  async getByEmail(email: string): Promise<GetByEmailUserDto> {
    const user = await this.usersRepository.findOne({ email });

    if (user) return user;
    throw new CustomNotFoundException(
      `User with email: ${email} does not exist`,
    );
  }

  async setRefreshToken(id: string, refreshToken: string): Promise<boolean> {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    const result = await this.usersRepository.update(id, {
      refreshToken: hashedRefreshToken,
    });

    if (result) return true;
    throw new DefaultNotFoundException(id, 'User');
  }

  async nullifyRefreshToken(id: string): Promise<boolean> {
    const result = this.usersRepository.update(id, {
      refreshToken: null,
    });

    if (result) return true;
    throw new DefaultNotFoundException(id, 'User');
  }

  async getUserIfRefreshTokenMatches(
    id: string,
    refreshToken: string,
  ): Promise<ResponseUserDto> {
    const user = await this.usersRepository.findOne({ id });
    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.refreshToken,
    );

    if (isRefreshTokenMatching) return new ResponseUserDto(user);
    throw new DefaultNotFoundException(id, 'User');
  }
}
