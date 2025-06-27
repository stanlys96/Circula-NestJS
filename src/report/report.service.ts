import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './entities/report.entity';
import { CreateReportDto } from './report.dto';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report)
    private reportRepo: Repository<Report>,
  ) {}

  async saveReport(createReportDto: CreateReportDto): Promise<Report> {
    const chatMessage = this.reportRepo.create({
      senderEmail: createReportDto.senderEmail,
      type: createReportDto.type,
      message: createReportDto.message,
    });
    return this.reportRepo.save(chatMessage);
  }
}
