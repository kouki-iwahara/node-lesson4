import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('increment', { type: 'int' })
  id!: number;

  @Column('int', { name: 'user_id' })
  userId: number;

  @Column('varchar')
  title: string;

  @Column('varchar')
  content: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
