// src/chat/chat.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatMessage } from './entities/chat.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatMessage)
    private chatRepo: Repository<ChatMessage>,
  ) {}

  async saveMessage(
    senderEmail: string,
    receiverEmail: string,
    message: string,
  ): Promise<ChatMessage> {
    const chatMessage = this.chatRepo.create({
      senderEmail,
      receiverEmail,
      message,
    });
    return this.chatRepo.save(chatMessage);
  }

  async getMessagesBetweenUsers(
    user1: string,
    user2: string,
  ): Promise<ChatMessage[]> {
    return this.chatRepo.find({
      where: [
        { senderEmail: user1, receiverEmail: user2 },
        { senderEmail: user2, receiverEmail: user1 },
      ],
      order: { createdAt: 'ASC' },
    });
  }
}
