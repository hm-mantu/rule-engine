import { Module } from '@nestjs/common';
import { RuleGeneratorService } from './rule-generator.service';

@Module({
  providers: [RuleGeneratorService]
})
export class RuleGeneratorModule {}
