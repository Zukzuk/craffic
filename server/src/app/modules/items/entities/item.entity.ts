import { MetadataEntity } from '../../../../database/entities/metadata.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'item' })
export class ItemEntity extends MetadataEntity {
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

  @Column({ type: 'int' })
  public year: number;

  @Column({ type: 'varchar', length: 50 })
  public language: string;
}
