import MetadataEntity from '../../../../database/entities/metadata.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import AddressEntity from './address.entity';
import { ROLES } from '../../auth/abac/auth.roles';
import BookEntity from '../../books/entities/book.entity';

@Entity({ name: 'user' })
export default class UserEntity extends MetadataEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ unique: true, type: 'varchar', length: 300 })
  public email: string;

  @Column({ nullable: true, type: 'varchar', length: 300 })
  public userName?: string;

  @Column({ type: 'varchar', length: 300 })
  public name: string;

  @Column({ nullable: true, type: 'varchar', length: 300 })
  public lastName?: string;

  @Column({ type: 'varchar' })
  public password: string;

  @Column({ nullable: true, type: 'varchar' })
  public refreshToken?: string;

  @Column({
    type: 'enum',
    enum: ROLES,
    array: true,
    default: [ROLES.WEBCLIENT_USER],
  })
  public roles: ROLES[];

  @OneToOne(() => AddressEntity, {
    // Always include related entities
    eager: true,
    // Always save related entity with this entity
    cascade: true,
  })
  @JoinColumn()
  public address: AddressEntity;

  @OneToMany(() => BookEntity, (book: BookEntity) => book.owner)
  public books: BookEntity[];
}
