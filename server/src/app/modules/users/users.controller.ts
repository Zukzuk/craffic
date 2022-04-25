import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Put,
  Patch,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import UsersService from './users.service';
import {
  CreateUserDto,
  UpdateUserDto,
  PatchUserDto,
  ResponseUserDto,
} from './dtos/user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RequestWithUser } from '../auth/auth.interface';
import UserClaims from './claims/user.claim';
import PermissionGuard from '../auth/abac/permission.guard';
import { Permissions } from '../auth/abac/permission.decorator';
import { DeleteResult } from 'typeorm';
import { JwtAuthGuard } from '../auth/abac/auth.guards';
import SelfGuard from '../auth/abac/self.guard';

@ApiTags('Users')
@Controller('users')
export default class UsersController {
  /*
  UsersController declares a dependency on the UsersService 'token' with constructor injection.
  NestJS will associate the 'token' 'UsersService' with the 'class' 'UsersService' from the users.service.ts file. 
  See also: https://docs.nestjs.com/fundamentals/custom-providers
  */
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    summary: 'Create a new User',
  })
  @Post()
  @Permissions(UserClaims.CanCreateUser)
  @UseGuards(JwtAuthGuard, PermissionGuard)
  async create(@Body() userData: CreateUserDto): Promise<ResponseUserDto> {
    return this.usersService.create(userData);
  }

  @ApiOperation({
    summary: 'Get the Users collection',
  })
  @Get()
  @Permissions(UserClaims.CanReadAllUsers)
  @UseGuards(JwtAuthGuard, PermissionGuard)
  async findAll(): Promise<ResponseUserDto[]> {
    return this.usersService.findAll();
  }

  @ApiOperation({
    summary: 'Get an User by ID',
  })
  @Get(':id')
  @Permissions(UserClaims.CanReadUser)
  @UseGuards(JwtAuthGuard, PermissionGuard, SelfGuard)
  async findOne(@Param('id') id: string): Promise<ResponseUserDto> {
    return this.usersService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update a User by ID',
  })
  @Put(':id')
  @Permissions(UserClaims.CanUpdateUser)
  @UseGuards(JwtAuthGuard, PermissionGuard, SelfGuard)
  async update(
    @Param('id') id: string,
    @Body() userData: UpdateUserDto,
    @Req() request: RequestWithUser,
  ): Promise<ResponseUserDto> {
    const {
      user: { id: ownerId },
    } = request;
    return this.usersService.updateOrPatch(id, userData, ownerId);
  }

  @ApiOperation({
    summary: 'Update a part of a User by ID',
  })
  @Patch(':id')
  @Permissions(UserClaims.CanUpdateUser)
  @UseGuards(JwtAuthGuard, PermissionGuard, SelfGuard)
  async patch(
    @Param('id') id: string,
    @Body() partialUserData: PatchUserDto,
    @Req() request: RequestWithUser,
  ): Promise<ResponseUserDto> {
    const {
      user: { id: ownerId },
    } = request;
    return this.usersService.updateOrPatch(id, partialUserData, ownerId);
  }

  @ApiOperation({
    summary: 'Delete a User by ID',
  })
  @Delete(':id')
  @Permissions(UserClaims.CanDeleteUser)
  @UseGuards(JwtAuthGuard, PermissionGuard, SelfGuard)
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.usersService.delete(id);
  }
}
