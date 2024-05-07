import { Test, TestingModule } from '@nestjs/testing';
import { RuleEngineController } from './rule-engine.controller';
import { RuleEngineService } from './rule-engine.service';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongooseModule } from '@nestjs/mongoose';
import { RuleEngine, RuleEngineSchema } from '../schemas/rule-engine.schema';

describe('RuleEngineController', () => {
  let controller: RuleEngineController;
  let mongod: MongoMemoryServer
  beforeAll(async () => {
    mongod = await MongoMemoryServer.create()
  })

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[
        MongooseModule.forRootAsync({
          useFactory: async () => ({
            uri: mongod.getUri(),
          }),
        }),
        MongooseModule.forFeature([
          { name: RuleEngine.name, schema: RuleEngineSchema }
        ])
      ],
      controllers: [RuleEngineController],
      providers: [RuleEngineService],
    }).compile();

    controller = module.get<RuleEngineController>(RuleEngineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
