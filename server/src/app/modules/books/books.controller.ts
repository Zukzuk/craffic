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
import { CreateBookDto, UpdateBookDto, PatchBookDto } from './dtos/book.dto';
import { BooksService } from './books.service';
import { RequestWithUser } from '../auth/auth.interface';

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
  create(@Body() bookData: CreateBookDto) {
    return this.booksService.create(bookData);
  }

  @ApiOperation({
    summary: 'Get the Books collection',
  })
  @Get()
  @UseGuards(PermissionGuard(BookClaims.CanReadAllBooks))
  findAll() {
    return this.booksService.findAll();
  }

  @ApiOperation({
    summary: 'Get a Book by ID',
  })
  @Get(':id')
  @UseGuards(PermissionGuard(BookClaims.CanReadBook))
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update a Book by ID',
  })
  @Put(':id')
  @UseGuards(PermissionGuard(BookClaims.CanUpdateBook))
  update(
    @Param('id') id: string,
    @Body() bookData: UpdateBookDto,
    @Req() request: RequestWithUser,
  ) {
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
  patch(
    @Param('id') id: string,
    @Body() partialBookData: PatchBookDto,
    @Req() request: RequestWithUser,
  ) {
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
  remove(@Param('id') id: string) {
    return this.booksService.remove(id);
  }

  @ApiOperation({
    summary: 'Sync Books to database',
  })
  @Post('/sync')
  sync() {
    return this.booksService.sync();
  }
}
