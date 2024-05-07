import { Module } from '@nestjs/common';
import { RuleEngineService } from './rule-engine.service';
import { RuleEngineController } from './rule-engine.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RuleEngine, RuleEngineSchema } from '../schemas/rule-engine.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: RuleEngine.name,
        schema: RuleEngineSchema
      }
    ])
  ],
  controllers: [RuleEngineController],
  providers: [RuleEngineService]
})
export class RuleEngineModule {}
