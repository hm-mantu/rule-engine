import { Test, TestingModule } from '@nestjs/testing';
import { RuleGeneratorService } from './rule-generator.service';

describe('RuleGeneratorService', () => {
  let service: RuleGeneratorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RuleGeneratorService],
    }).compile();

    service = module.get<RuleGeneratorService>(RuleGeneratorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Verify the OR condition', () => {
    expect(service.execute({
      "conditions": [
        {
          "operator": "or",
          "questions": [
            {
              "operator": "equal",
              "path": "name",
              "value": "John Doe"
            },
            {
              "operator": "equal",
              "path": "age",
              "value": 45
            }
          ]
        }
      ]
    }, {
      "name": "John Doe",
      "age": 90
    })).toBe(true)
  })

  it('Verify the AND condition', () => {
    expect(service.execute({
      "conditions": [
        {
          "operator": "and",
          "questions": [
            {
              "operator": "equal",
              "path": "name",
              "value": "John Doe"
            },
            {
              "operator": "equal",
              "path": "age",
              "value": 45
            }
          ]
        }
      ]
    }, {
      "name": "John Doe",
      "age": 45
    })).toBe(true)
  })

  it('Verify the conditions', () => {
    expect(service.execute({
        "conditions":  [
              {
                "operator": "equal",
                "path": "name",
                "value": "John Doe"
              },
              {
                "operator": "equal",
                "path": "age",
                "value": 45
              }
            ]
      }, {
        "name": "John Doe",
        "age": 90
    })).toBe(true)
  })


  it('Verify in conditions', () => {
    expect(service.execute({
        "conditions":  [
              {
                "operator": "equal",
                "path": "name",
                "value": "John Doe"
              },
              {
                "operator": "in",
                "path": "age",
                "value": [45, 70, 90]
              },
              {
                "operator": "greaterThan",
                "path": "someKey",
                "value": 40
              },
              {
                "operator": "range",
                "path": "userAge",
                "value": [18, 24]
              }
            ]
      }, {
        "name": "John Doe",
        "age":[90],
        "someKey": 50,
        "userAge": 20
    })).toBe(true)
  })

  // Verify the complicated conditions
  it('Path testing', () => {
    expect(service.execute({
      "conditions": [
        {
          "operator": "equal",
          "path": "name",
          "value": "John Doe"
        },
        {
          "operator": "and",
          "questions": [
            {
              "operator": "equal",
              "path": "name.firstName",
              "value": "John"
            },
            {
              "operator": "equal",
              "path": "name.lastName",
              "value": "Doe"
            },
            {
              "operator": "lessThan",
              "path": "age",
              "value": 45
            }
          ]
        },
      ]
    }, {
        "name": {
          "firstName": "John",
          "lastName": "Doe"
        },
        "age": 30,
        "someField": true,
        "someField1": false
    })).toBe(true)
  })

  // it('')
  
});
