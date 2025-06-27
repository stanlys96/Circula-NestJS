import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ChatModule } from './chat/chat.module';
import { UploadController } from './upload/upload.controller';
import { UploadService } from './upload/upload.service';
import { ReportModule } from './report/report.module';

@Module({
  imports: [
    UsersModule,
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT ?? '0'), // Default PostgreSQL port
      username: process.env.DATABASE_USERNAME, // Database username
      password: process.env.DATABASE_PASSWORD, // Database password
      database: process.env.DATABASE_DB, // Database name
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Entities location
      synchronize: true, // Set to false in production
    }),
    ChatModule,
    ReportModule,
  ],
  controllers: [AppController, UploadController],
  providers: [AppService, UploadService],
})
export class AppModule {}
