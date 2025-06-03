import { Body, Controller, Get, HttpStatus, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto, LoginDto } from './users.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Get a user' })
  @Get('user')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns the specified user',
  })
  getUser(@Query('email') role: string): any {
    return this.usersService.findByEmail(role);
  }

  @ApiOperation({ summary: 'Register user by email' })
  @Post('register')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns the reference id and email of the user registered',
  })
  registerUser(@Body() body: CreateUserDto): any {
    return this.usersService.register(body);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.usersService.login(loginDto);
  }

  @ApiOperation({ summary: 'Register user by google' })
  @Post('google-register')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns the reference id and email of the user registered',
  })
  registerUserWithGoogle(@Body() body: CreateUserDto): any {
    return this.usersService.registerWithGoogle(body);
  }

  @ApiOperation({ summary: 'Update Details' })
  @Post('update-details')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns the reference id and email of the user registered',
  })
  updateUserDetails(@Body() body: CreateUserDto): any {
    return this.usersService.updateUserDetails(body);
  }
}
