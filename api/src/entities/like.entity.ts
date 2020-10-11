import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Like {
  @PrimaryGeneratedColumn('increment', { type: 'int' })
  id!: number;

  @Column('int', { name: 'user_id' })
  userId: number;

  @Column('int', { name: 'post_id' })
  postId: number;

  @Column('int', { name: 'is_liked', default: 0 })
  isLiked: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
