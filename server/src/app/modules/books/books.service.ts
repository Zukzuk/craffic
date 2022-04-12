import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  CreateBookDto,
  PatchBookDto,
  ResponseBookDto,
  UpdateBookDto,
} from './dtos/book.dto';
import ExtractorService from '../../providers/extractor.service';
import {
  DefaultNotFoundException,
  CollectionNotFoundException,
} from '../../exceptions/notFound.exception';
import { InjectRepository } from '@nestjs/typeorm';
import BookEntity from './entities/book.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export default class BooksService {
  constructor(
    private extractor: ExtractorService,
    @InjectRepository(BookEntity)
    private booksRepository: Repository<BookEntity>,
  ) {}

  async create(bookData: CreateBookDto): Promise<ResponseBookDto> {
    const newBook = await this.booksRepository.create(bookData);
    const savedBook = await this.booksRepository.save(newBook);

    if (savedBook) return new ResponseBookDto(savedBook);
    throw new InternalServerErrorException();
  }

  async findAll(): Promise<ResponseBookDto[]> {
    const books = await this.booksRepository.find();

    if (books) return books.map((book) => new ResponseBookDto(book));
    throw new CollectionNotFoundException();
  }

  async findOne(id: string): Promise<ResponseBookDto> {
    const book = await this.booksRepository.findOne({ id });

    if (book) return new ResponseBookDto(book);
    throw new DefaultNotFoundException(id, 'Book');
  }

  async updateOrPatch(
    id: string,
    bookData: UpdateBookDto | PatchBookDto,
    requesterId: string,
  ): Promise<ResponseBookDto> {
    const modifiedBook = await this.booksRepository.create({
      id,
      ...bookData,
      lastChangedBy: requesterId,
    });
    const savedBook = await this.booksRepository.save(modifiedBook);

    if (savedBook) return new ResponseBookDto(savedBook);
    throw new DefaultNotFoundException(id, 'Book');
  }

  async delete(id: string): Promise<DeleteResult> {
    return this.booksRepository.delete({ id });
  }

  async sync(): Promise<string> {
    const extractedMsg = this.extractor.sync('../library', [
      'FearAgentFolders.cbz',
      '2000AD-2268.cbr',
    ]);

    return extractedMsg;
  }
}
