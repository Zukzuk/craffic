import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import BooksService from './books.service';
import ExtractorService from '../../providers/extractor.service';
import BooksController from './books.controller';
import BookEntity from './entities/book.entity';
import CategoryEntity from './entities/category.entity';

@Module({
  controllers: [BooksController],
  providers: [BooksService, ExtractorService],
  imports: [TypeOrmModule.forFeature([BookEntity, CategoryEntity])],
  exports: [],
})
export default class BooksModule {}
