import { Controller, Get, Post, Put, Delete, Patch, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ApiImplicitBody } from '@nestjs/swagger/dist/decorators/api-implicit-body.decorator';
import { createTestDto, updateTestDto, patchTestDto } from '../dto/test.dto';
import { ITest } from '../interfaces';
import { TestService } from './test.service';

@ApiTags('Test')
@Controller('test')
export class TestController {
  constructor(private service: TestService) {}

  @ApiOperation({
    summary: 'Create a new test item'
  })
  @Post()
  async create(@Body() dto: createTestDto) {
    this.service.create(dto);
  }

  @Get()
  async findAll(): Promise<ITest[]> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: updateTestDto) {
    return this.service.update(Number(id), dto);
  }

  @Patch(':id')
  patch(@Param('id') id: string, @Body() dto: patchTestDto) {
    return this.service.patch(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }
  
  @Post('/reset')
  reset() {
    return this.service.reset();
  }
}