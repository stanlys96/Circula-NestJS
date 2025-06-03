import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto, LoginDto } from './users.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Get all users that have registered' })
  @Get('users')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns the users that have registered',
  })
  fetchUsers(): any {
    return this.usersService.getAllUsers();
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
}
