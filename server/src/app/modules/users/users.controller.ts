import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Put,
  Patch,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto, PatchUserDto } from './dtos/user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RequestWithUser } from '../auth/auth.interface';
import UserClaims from './claims/user.claim';
import PermissionGuard from '../auth/abac/permission.guard';

@ApiTags('Users')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
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
  @UseGuards(PermissionGuard(UserClaims.CanCreateUser))
  create(@Body() userData: CreateUserDto) {
    return this.usersService.create(userData);
  }

  @ApiOperation({
    summary: 'Get the Users collection',
  })
  @Get()
  @UseGuards(PermissionGuard(UserClaims.CanReadAllUsers))
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({
    summary: 'Get an User by ID',
  })
  @Get(':id')
  @UseGuards(PermissionGuard(UserClaims.CanReadUser))
  findOne(@Param('id') id: string) {
    return this.usersService.getById(id);
  }

  @ApiOperation({
    summary: 'Update a User by ID',
  })
  @Put(':id')
  @UseGuards(PermissionGuard(UserClaims.CanUpdateUser))
  update(
    @Param('id') id: string,
    @Body() userData: UpdateUserDto,
    @Req() request: RequestWithUser,
  ) {
    const {
      user: { id: requesterId },
    } = request;
    return this.usersService.updateOrPatch(id, userData, requesterId);
  }

  @ApiOperation({
    summary: 'Update a part of a User by ID',
  })
  @Patch(':id')
  @UseGuards(PermissionGuard(UserClaims.CanUpdateUser))
  patch(
    @Param('id') id: string,
    @Body() partialUserData: PatchUserDto,
    @Req() request: RequestWithUser,
  ) {
    const {
      user: { id: requesterId },
    } = request;
    return this.usersService.updateOrPatch(id, partialUserData, requesterId);
  }

  @ApiOperation({
    summary: 'Delete a User by ID',
  })
  @Delete(':id')
  @UseGuards(PermissionGuard(UserClaims.CanDeleteUser))
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
