import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import BookEntity from './book.entity';

@Entity()
class CategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;

  @ManyToMany(() => BookEntity, (book: BookEntity) => book.categories)
  public books: BookEntity[];
}

export default CategoryEntity;
