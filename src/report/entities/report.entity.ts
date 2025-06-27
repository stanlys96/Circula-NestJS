// src/chat/chat-message.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('reports')
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  senderEmail: string;

  @Column()
  type: string;

  @Column('text')
  message: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
