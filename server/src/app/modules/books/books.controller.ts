import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Param,
  Body,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import PermissionGuard from '../auth/abac/permission.guard';
import BookClaims from './claims/book.claim';
import {
  CreateBookDto,
  UpdateBookDto,
  PatchBookDto,
  ResponseBookDto,
} from './dtos/book.dto';
import { BooksService } from './books.service';
import { RequestWithUser } from '../auth/auth.interface';
import { DeleteResult } from 'typeorm';

@ApiTags('Books')
@Controller('books')
@UseInterceptors(ClassSerializerInterceptor)
export class BooksController {
  constructor(private booksService: BooksService) {}

  @ApiOperation({
    summary: 'Create a new Book',
  })
  @Post()
  @UseGuards(PermissionGuard(BookClaims.CanCreateBook))
  async create(@Body() bookData: CreateBookDto): Promise<ResponseBookDto> {
    return this.booksService.create(bookData);
  }

  @ApiOperation({
    summary: 'Get the Books collection',
  })
  @Get()
  @UseGuards(PermissionGuard(BookClaims.CanReadAllBooks))
  async findAll(): Promise<ResponseBookDto[]> {
    return this.booksService.findAll();
  }

  @ApiOperation({
    summary: 'Get a Book by ID',
  })
  @Get(':id')
  @UseGuards(PermissionGuard(BookClaims.CanReadBook))
  async findOne(@Param('id') id: string): Promise<ResponseBookDto> {
    return this.booksService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update a Book by ID',
  })
  @Put(':id')
  @UseGuards(PermissionGuard(BookClaims.CanUpdateBook))
  async update(
    @Param('id') id: string,
    @Body() bookData: UpdateBookDto,
    @Req() request: RequestWithUser,
  ): Promise<ResponseBookDto> {
    const {
      user: { id: requesterId },
    } = request;
    return this.booksService.updateOrPatch(id, bookData, requesterId);
  }

  @ApiOperation({
    summary: 'Update a part of a Book by ID',
  })
  @Patch(':id')
  @UseGuards(PermissionGuard(BookClaims.CanUpdateBook))
  async patch(
    @Param('id') id: string,
    @Body() partialBookData: PatchBookDto,
    @Req() request: RequestWithUser,
  ): Promise<ResponseBookDto> {
    const {
      user: { id: requesterId },
    } = request;
    return this.booksService.updateOrPatch(id, partialBookData, requesterId);
  }

  @ApiOperation({
    summary: 'Remove a Book by ID',
  })
  @Delete(':id')
  @UseGuards(PermissionGuard(BookClaims.CanDeleteBook))
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.booksService.delete(id);
  }

  @ApiOperation({
    summary: 'Sync Books to database',
  })
  @Post('/sync')
  async sync(): Promise<string> {
    return this.booksService.sync();
  }
}
