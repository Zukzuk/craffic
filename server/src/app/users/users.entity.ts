import { IsEmail, Length } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  public id?: number;

  @Column({ unique: true })
  @IsEmail()
  public email: string;

  @Column()
  public name: string;

  @Column()
  @Length(12)
  public password: string;
}
