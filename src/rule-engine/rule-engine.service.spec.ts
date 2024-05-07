import { Test, TestingModule } from '@nestjs/testing';
import { RuleEngineService } from './rule-engine.service';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongooseModule } from '@nestjs/mongoose';
import { RuleEngine, RuleEngineSchema } from '../schemas/rule-engine.schema';

describe('RuleEngineService', () => {
  let service: RuleEngineService;
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
      providers: [RuleEngineService],
    }).compile();

    service = module.get<RuleEngineService>(RuleEngineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
