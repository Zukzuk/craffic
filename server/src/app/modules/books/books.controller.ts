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
import BooksService from './books.service';
import { RequestWithUser } from '../auth/auth.interface';
import { DeleteResult } from 'typeorm';
import { Permissions } from '../auth/abac/permission.decorator';
import { JwtAuthGuard } from '../auth/abac/auth.guards';

@ApiTags('Books')
@Controller('books')
export default class BooksController {
  constructor(private booksService: BooksService) {}

  @ApiOperation({
    summary: 'Create a new Book',
  })
  @Post()
  @Permissions(BookClaims.CanCreateBook)
  @UseGuards(JwtAuthGuard, PermissionGuard)
  async create(
    @Body() bookData: CreateBookDto,
    @Req() request: RequestWithUser,
  ): Promise<ResponseBookDto> {
    return this.booksService.create(bookData, request.user);
  }

  @ApiOperation({
    summary: 'Get the Books collection',
  })
  @Get()
  @Permissions(BookClaims.CanReadAllBooks)
  @UseGuards(JwtAuthGuard, PermissionGuard)
  async findAll(): Promise<ResponseBookDto[]> {
    return this.booksService.findAll();
  }

  @ApiOperation({
    summary: 'Get a Book by ID',
  })
  @Get(':id')
  @Permissions(BookClaims.CanReadBook)
  @UseGuards(JwtAuthGuard, PermissionGuard)
  async findOne(@Param('id') id: string): Promise<ResponseBookDto> {
    return this.booksService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update a Book by ID',
  })
  @Put(':id')
  @Permissions(BookClaims.CanUpdateBook)
  @UseGuards(JwtAuthGuard, PermissionGuard)
  async update(
    @Param('id') id: string,
    @Body() bookData: UpdateBookDto,
    @Req() request: RequestWithUser,
  ): Promise<ResponseBookDto> {
    const {
      user: { id: ownerId },
    } = request;
    return this.booksService.updateOrPatch(id, bookData, ownerId);
  }

  @ApiOperation({
    summary: 'Update a part of a Book by ID',
  })
  @Patch(':id')
  @Permissions(BookClaims.CanUpdateBook)
  @UseGuards(JwtAuthGuard, PermissionGuard)
  async patch(
    @Param('id') id: string,
    @Body() partialBookData: PatchBookDto,
    @Req() request: RequestWithUser,
  ): Promise<ResponseBookDto> {
    const {
      user: { id: ownerId },
    } = request;
    return this.booksService.updateOrPatch(id, partialBookData, ownerId);
  }

  @ApiOperation({
    summary: 'Remove a Book by ID',
  })
  @Delete(':id')
  @Permissions(BookClaims.CanDeleteBook)
  @UseGuards(JwtAuthGuard, PermissionGuard)
  async remove(
    @Param('id') id: string,
    @Req() request: RequestWithUser,
  ): Promise<DeleteResult> {
    const {
      user: { id: ownerId },
    } = request;
    return this.booksService.delete(id, ownerId);
  }
}
