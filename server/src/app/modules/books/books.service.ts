import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  CreateBookDto,
  PatchBookDto,
  ResponseBookDto,
  UpdateBookDto,
} from './dtos/book.dto';
import {
  DefaultNotFoundException,
  CollectionNotFoundException,
} from '../../exceptions/notFound.exception';
import { InjectRepository } from '@nestjs/typeorm';
import BookEntity from './entities/book.entity';
import { DeleteResult, Repository } from 'typeorm';
import UserEntity from '../users/entities/user.entity';

@Injectable()
export default class BooksService {
  constructor(
    @InjectRepository(BookEntity)
    private booksRepository: Repository<BookEntity>,
  ) {}

  // CRUD //

  async create(
    bookData: CreateBookDto,
    user: UserEntity,
  ): Promise<ResponseBookDto> {
    const newBook = await this.booksRepository.create({
      ...bookData,
      owner: user,
    });
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
    ownerId: string,
  ): Promise<ResponseBookDto> {
    const modifiedBook = await this.booksRepository.create({
      id,
      ...bookData,
      lastChangedBy: ownerId,
    });
    const savedBook = await this.booksRepository.save({
      ...modifiedBook,
      ownerId,
    });

    if (savedBook) return new ResponseBookDto(savedBook);
    throw new DefaultNotFoundException(id, 'Book');
  }

  async delete(id: string, ownerId: string): Promise<DeleteResult> {
    return this.booksRepository.delete({ id, ownerId });
  }
}
