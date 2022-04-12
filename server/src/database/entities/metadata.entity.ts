import {
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

export default abstract class MetadataEntity {
  @Column({ type: 'boolean', default: true })
  readonly isActive: boolean;

  @Column({ type: 'boolean', default: false })
  readonly isArchived: boolean;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  readonly createDateTime: Date;

  @Column({ type: 'varchar', length: 300, nullable: true })
  readonly createdBy?: string;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  lastChangedDateTime: Date;

  @Column({ type: 'varchar', length: 300, nullable: true })
  readonly lastChangedBy?: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  readonly internalComment?: string | null;

  // Support TypeORM softDelete
  @DeleteDateColumn()
  readonly deletedAt?: Date;
}
