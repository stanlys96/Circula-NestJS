// src/chat/chat.controller.ts
import { Controller, Get, Post, Query } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatMessage } from './entities/chat.entity';
import { CreateChatDto } from './chat.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('messages')
  async getMessagesByEmail(
    @Query('email') email: string,
  ): Promise<ChatMessage[]> {
    return this.chatService.findByEmail(email);
  }

  @Post('add-message')
  async addMessage(createChatDto: CreateChatDto) {
    return this.chatService.saveMessage(createChatDto);
  }
}
