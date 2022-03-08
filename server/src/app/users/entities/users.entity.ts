import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: number;

  @Column({ unique: true, type: 'varchar', length: 300 })
  public email: string;

  @Column({ type: 'varchar', length: 300 })
  public userName?: string;

  @Column({ type: 'varchar', length: 300 })
  public name: string;

  @Column({ type: 'varchar', length: 300 })
  public lastName?: string;

  @Column({ type: 'varchar' })
  public password: string;

  @Column({ type: 'varchar', length: 50 })
  public phoneNumber?: string;
}
