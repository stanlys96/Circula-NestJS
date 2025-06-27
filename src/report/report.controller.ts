// src/chat/chat.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportDto } from './report.dto';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post('add-report')
  async addReport(@Body() createReportDto: CreateReportDto) {
    return this.reportService.saveReport(createReportDto);
  }
}
