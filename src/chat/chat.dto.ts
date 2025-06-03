import { ApiProperty } from '@nestjs/swagger';

export class CreateChatDto {
  @ApiProperty({ description: 'The email of the user' })
  senderEmail: string;

  @ApiProperty({ description: 'The email of the user' })
  receiverEmail: string;

  @ApiProperty()
  created_at: string;

  @ApiProperty()
  message: string;
}
