import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { ExtractorService } from '../../providers/extractor.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from './entities/book.entity';

@Module({
  controllers: [BooksController],
  providers: [BooksService, ExtractorService],
  imports: [TypeOrmModule.forFeature([BookEntity])],
  exports: [],
})
export class BooksModule {}
