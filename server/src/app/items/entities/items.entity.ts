import { BaseEntity } from '../../../database/entities/base.entity';
import { Entity, Column } from 'typeorm';

@Entity({ name: 'items' })
export class ItemEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 300 })
  public author: string;

  @Column({ type: 'varchar', length: 300 })
  public artist: string;

  @Column({ type: 'varchar', length: 300 })
  public title: string;

  @Column({ type: 'varchar' })
  public description: string;

  @Column({ type: 'int' })
  public year: number;

  @Column({ type: 'varchar', length: 50 })
  public language: string;
}
