// import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// @Entity()
// class EItem {
//   @PrimaryGeneratedColumn()
//   public id: number;

//   @Column()
//   public author: string;

//   @Column()
//   public artist: string;

//   @Column()
//   public title: string;

//   @Column()
//   public description: string;

//   @Column()
//   public year: number;

//   @Column()
//   public language: string;
// }

// export default EItem;

import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../database/base.entity';

@Entity({ name: 'item' })
export class ItemEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 300 })
  public author: string;

  @Column({ type: 'varchar', length: 300 })
  public artist: string;

  @Column({ type: 'varchar', length: 300 })
  public title: string;

  @Column({ type: 'varchar' })
  public description: string;

  @Column()
  public year: number;

  @Column()
  public language: string;
}
