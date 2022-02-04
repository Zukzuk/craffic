import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TestService } from './test.service';

@ApiTags('Test')
@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get(':id')
  getHello(): string {
    return this.testService.getResponse();
  }

  @Post() 
  postExample(): string {
    return this.testService.postResponse()
  }
}