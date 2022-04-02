import {
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

export abstract class MetadataEntity {
  @Column({ type: 'boolean', default: true })
  @Exclude()
  isActive: boolean;

  @Column({ type: 'boolean', default: false })
  @Exclude()
  isArchived: boolean;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  @Exclude()
  createDateTime: Date;

  @Column({ type: 'varchar', length: 300, nullable: true })
  @Exclude()
  createdBy?: string;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  @Exclude()
  lastChangedDateTime: Date;

  @Column({ type: 'varchar', length: 300, nullable: true })
  @Exclude()
  lastChangedBy?: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  @Exclude()
  internalComment?: string | null;

  // Support TypeORM softDelete
  @DeleteDateColumn()
  @Exclude()
  deletedAt?: Date;
}
