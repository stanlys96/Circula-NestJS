// src/chat/chat.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatMessage } from './entities/chat.entity';
import { CreateChatDto } from './chat.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatMessage)
    private chatRepo: Repository<ChatMessage>,
  ) {}

  async saveMessage(createChatDto: CreateChatDto): Promise<ChatMessage> {
    const chatMessage = this.chatRepo.create({
      senderEmail: createChatDto.senderEmail,
      receiverEmail: createChatDto.receiverEmail,
      message: createChatDto.message,
    });
    return this.chatRepo.save(chatMessage);
  }

  async findByEmail(email: string): Promise<ChatMessage[]> {
    return this.chatRepo.find({
      where: [{ senderEmail: email }, { receiverEmail: email }],
      order: {
        createdAt: 'ASC',
      },
    });
  }
}
