import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto, LoginDto } from './users.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

function generateRandomString(length: number = 16): string {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async registerWithGoogle(createUserDto: CreateUserDto) {
    const { email } = createUserDto;
    const existing = await this.userRepository.findOne({ where: { email } });
    if (!existing) {
      const hashedPassword = await bcrypt.hash(generateRandomString(), 10);
      const newUser = this.userRepository.create({
        email,
        password: hashedPassword,
        provider: 'google',
      });
      await this.userRepository.save(newUser);
    }
    return { email };
  }

  async register(createUserDto: CreateUserDto) {
    const { username, email, password, provider } = createUserDto;

    const existing = await this.userRepository.findOne({ where: { email } });
    if (existing) {
      throw new ConflictException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({
      username,
      email,
      password: hashedPassword,
      provider,
    });
    await this.userRepository.save(newUser);
    return {
      message: 'Success',
      email,
    };
  }

  async findByEmail(email: string) {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }
      const { password, ...safeUser } = user;
      return safeUser;
    } catch {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async login(loginDto: LoginDto) {
    try {
      const { email, password } = loginDto;
      const user = await this.userRepository.findOne({ where: { email } });
      if (!user || !(await bcrypt.compare(password, user?.password))) {
        throw new UnauthorizedException('Invalid credentials');
      }
      const payload = { sub: user?.id, email: user?.email };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch {
      return { message: 'Invalid credentials' };
    }
  }
}
