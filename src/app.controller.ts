import { Controller, Get, Post, Request } from '@nestjs/common';
import { AppService } from './app.service';
import jsonFormData from './data/form-1.json'
import applicationFormData from './data/application-form.json'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  saveCondition(@Request() req): any {
    return this.appService.create(req.body)
  }

  @Post('check-eligibility/:id')
  checkEligibility(@Request() req): Promise<any> {
    const { id } = req.params
    return this.appService.checkEligible(id)
  }

  @Get('questions/:programName')
  getQuestions(@Request() req) {
    return this.appService.getQuestionsByType(applicationFormData, '')
  }
}
