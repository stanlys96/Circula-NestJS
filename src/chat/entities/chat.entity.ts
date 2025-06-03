// src/chat/chat-message.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('chat_messages')
export class ChatMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  senderEmail: string;

  @Column()
  receiverEmail: string;

  @Column('text')
  message: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
