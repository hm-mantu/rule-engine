import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RuleGeneratorModule } from './rule-generator/rule-generator.module';
import { RuleGeneratorService } from './rule-generator/rule-generator.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProgramCondition, ProgramConditionSchema } from './schemas/program_conditions.schema';
import { SomeData, SomeDataSchema } from './schemas/some_datas.schema';
import { RuleEngine, RuleEngineSchema } from './schemas/rule-engine.schema';
import { RuleEngineModule } from './rule-engine/rule-engine.module';

@Module({
  imports: [
    RuleGeneratorModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get('MONGO_URI');
        return {
          uri
        }
      },
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      {
        name: ProgramCondition.name, 
        schema: ProgramConditionSchema
      },
      {
        name: SomeData.name, 
        schema: SomeDataSchema
      },
      {
        name: RuleEngine.name, 
        schema: RuleEngineSchema
      }
    ]),
    RuleEngineModule
  ],
  controllers: [AppController],
  providers: [AppService, RuleGeneratorService],
})
export class AppModule {}
