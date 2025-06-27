import { ApiProperty } from '@nestjs/swagger';

export class CreateReportDto {
  @ApiProperty({ description: 'The email of the user' })
  senderEmail: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  message: string;
}
