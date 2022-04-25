import MetadataEntity from '../../../../database/entities/metadata.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import UserEntity from '../../users/entities/user.entity';
import CategoryEntity from './category.entity';

@Entity({ name: 'books' })
export default class BookEntity extends MetadataEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 300 })
  public author: string;

  @Column({ type: 'varchar', length: 300 })
  public artist: string;

  @Column({ type: 'varchar', length: 300 })
  public title: string;

  @Column({ type: 'varchar' })
  public description: string;

  @Column({ nullable: true, type: 'int' })
  public year?: number;

  @Column({ nullable: true, type: 'varchar', length: 50 })
  public language?: string;

  @Column()
  ownerId: string;
  @JoinColumn({ name: 'ownerId' })
  @ManyToOne(() => UserEntity, (owner: UserEntity) => owner.books)
  public owner: UserEntity;

  @ManyToMany(
    () => CategoryEntity,
    (category: CategoryEntity) => category.books,
  )
  @JoinTable()
  public categories: CategoryEntity[];
}
