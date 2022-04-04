import { Exclude } from 'class-transformer';
import { MetadataEntity } from '../../../../database/entities/metadata.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AddressEntity } from './address.entity';
import { ROLES } from '../../auth/abac/auth.roles';

@Entity({ name: 'user' })
export class UserEntity extends MetadataEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, type: 'varchar', length: 300 })
  public email: string;

  @Column({ type: 'varchar', length: 300 })
  public userName?: string;

  @Column({ type: 'varchar', length: 300 })
  public name: string;

  @Column({ type: 'varchar', length: 300 })
  public lastName?: string;

  @Column({ type: 'varchar' })
  @Exclude()
  public password: string;

  @Column({
    type: 'enum',
    enum: ROLES,
    array: true,
    default: [ROLES.WEBCLIENT_USER],
  })
  @Exclude()
  public roles: ROLES[];

  @OneToOne(() => AddressEntity)
  @JoinColumn()
  public address: AddressEntity;
}
