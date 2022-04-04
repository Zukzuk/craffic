import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateBookDto, PatchBookDto, UpdateBookDto } from './dtos/book.dto';
import { ExtractorService } from '../../providers/extractor.service';
import {
  DefaultNotFoundException,
  CollectionNotFoundException,
} from '../../exceptions/notFound.exception';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from './entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(
    private extractor: ExtractorService,
    @InjectRepository(BookEntity)
    private booksRepository: Repository<BookEntity>,
  ) {}

  async create(bookData: CreateBookDto) {
    const newBook = await this.booksRepository.create(bookData);
    const savedBook = await this.booksRepository.save(newBook);

    if (savedBook) return savedBook;
    throw new InternalServerErrorException();
  }

  async findAll() {
    const books = await this.booksRepository.find();

    if (books) return books;
    throw new CollectionNotFoundException();
  }

  async findOne(id: string) {
    const book = await this.booksRepository.findOne({ id });

    if (book) return book;
    throw new DefaultNotFoundException(id, 'Book');
  }

  async updateOrPatch(
    id: string,
    bookData: UpdateBookDto | PatchBookDto,
    requesterId: string,
  ) {
    const modifiedBook = await this.booksRepository.create({
      id,
      ...bookData,
      lastChangedBy: requesterId,
    });
    const savedBook = await this.booksRepository.save(modifiedBook);

    if (savedBook) return savedBook;
    throw new DefaultNotFoundException(id, 'Book');
  }

  async remove(id: string) {
    return await this.booksRepository.delete({ id });
  }

  async sync() {
    const extractedMsg = this.extractor.sync('../library', [
      'FearAgentFolders.cbz',
      '2000AD-2268.cbr',
    ]);

    return extractedMsg;
  }
}
