import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'address' })
export default class AddressEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: number;

  @Column({ type: 'varchar', length: 300 })
  public street: string;

  @Column({ type: 'varchar', length: 300 })
  public city: string;

  @Column({ type: 'varchar', length: 300 })
  public country: string;

  @Column({ type: 'varchar', length: 50 })
  public phoneNumber?: string;
}
