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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { BaseUserDto, PartialUserDto } from './dtos/users.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @ApiOperation({
  //   summary: 'Create a new User',
  // })
  // @Post()
  // create(@Body() userData: BaseUserDto) {
  //   return this.usersService.create(userData);
  // }

  @ApiOperation({
    summary: 'Get the Users collection',
  })
  @ApiBearerAuth()
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({
    summary: 'Get an User by ID',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.getById(id);
  }

  @ApiOperation({
    summary: 'Update a User by ID',
  })
  @Put(':id')
  update(@Param('id') id: string, @Body() userData: BaseUserDto) {
    return this.usersService.updateOrPatch(id, userData);
  }

  @ApiOperation({
    summary: 'Update a part of a User by ID',
  })
  @Patch(':id')
  patch(@Param('id') id: string, @Body() partialUserData: PartialUserDto) {
    return this.usersService.updateOrPatch(id, partialUserData);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
