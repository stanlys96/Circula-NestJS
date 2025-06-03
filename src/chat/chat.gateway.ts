import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({ cors: { origin: '*' }, namespace: '/chat' })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  private connectedClients: Map<string, Socket> = new Map(); // Map userId -> socket

  constructor(private readonly chatService: ChatService) {}

  handleConnection(client: any) {
    const userId = client.handshake.query.userId.toString();
    if (userId) {
      this.connectedClients.set(userId, client);
      console.log(`User connected: ${userId}`);
    }
  }

  handleDisconnect(client: Socket) {
    for (const [userId, socket] of this.connectedClients.entries()) {
      if (socket.id === client.id) {
        this.connectedClients.delete(userId);
        console.log(`User disconnected: ${userId}`);
        break;
      }
    }
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody()
    data: {
      senderEmail: string;
      receiverEmail: string;
      message: string;
    },
  ) {
    const savedMessage = await this.chatService.saveMessage(
      data.senderEmail,
      data.receiverEmail,
      data.message,
    );

    const receiverSocket = this.connectedClients.get(data.receiverEmail);
    if (receiverSocket) {
      receiverSocket.emit('receiveMessage', savedMessage);
    }

    const senderSocket = this.connectedClients.get(data.senderEmail);
    if (senderSocket) {
      senderSocket.emit('messageSent', savedMessage);
    }
  }
}
