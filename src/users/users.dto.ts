import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'The email of the user' })
  email: string;

  @ApiProperty({ description: 'The username of the user' })
  username: string;

  @ApiProperty({ description: 'The age of the user' })
  age: number;

  @ApiProperty()
  bloodType: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  gpsAllowed: boolean;

  @ApiProperty()
  hasChosenDonateBlood: boolean;

  @ApiProperty()
  hasRegistered: boolean;

  @ApiProperty()
  homeLocation: string;

  @ApiProperty()
  legalDocumentUrl: string;

  @ApiProperty()
  photoUrl: string;

  @ApiProperty()
  provider: string;

  @ApiProperty()
  whatsAppNumber: string;
}

export class LoginDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
