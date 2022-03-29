import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

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

  @Column({ type: 'varchar', length: 50 })
  public phoneNumber?: string;
}
