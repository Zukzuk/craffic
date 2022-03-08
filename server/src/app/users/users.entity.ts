import { IsEmail, Length } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: number;

  @Column({ unique: true, type: 'varchar', length: 300 })
  @IsEmail()
  public email: string;

  @Column({ type: 'varchar', length: 300 })
  public userName: string;

  @Column({ type: 'varchar', length: 300 })
  public name: string;

  @Column({ type: 'varchar', length: 300 })
  public lastName: string;

  @Column()
  @Length(12)
  public password: string;

  @Column({ type: 'varchar', length: 50 })
  public phoneNumber?: string;
}
