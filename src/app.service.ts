import { Injectable } from '@nestjs/common';
import { RuleGeneratorService } from './rule-generator/rule-generator.service';
import { InjectModel } from '@nestjs/mongoose';
import { ProgramCondition } from './schemas/program_conditions.schema';
import { Model } from 'mongoose';
import { SomeData } from './schemas/some_datas.schema';

// {_id: {$in: [ObjectId('6601af71d54a1deda47e26b4'), ObjectId('6598e72b4d7bea3e3d24856e')]}}

@Injectable()
export class AppService {
  components = []
  pageCount = 0
  constructor(private readonly ruleGenerator: RuleGeneratorService, 
    @InjectModel(ProgramCondition.name) private readonly model: Model<ProgramCondition>,
    @InjectModel(SomeData.name) private readonly dataModel: Model<SomeData>
  ){}

  getHello(): any {
    // The query also from database
    let query: any = {
      and: [
        { question1: true },
        { question2: false },
      ],
      question3: "somevalue",
      or: [
        { question4: "Nothing" },
        { question5: "Something1" }
      ]
    }
    query = {
      conditions: [
        {
          operator: 'and',
          questions: [
            {
              operator: 'equal',
              path: 'question1',
              value: true
            },
            {
              operator: 'equal',
              path: 'question2',
              value: true
            }
          ]
        },
        {
          operator: 'equal',
          path: 'question3',
          value: true
        },
        {
          operator: 'or',
          questions: [
            {
              operator: 'equal',
              path: 'question4',
              value: "Nothingdkaj"
            },
            {
              operator: 'equal',
              path: 'question5',
              value: "Something123"
            }
          ]
        }
      ]
    }
    const res =  this.ruleGenerator.execute(query)

    if (res) return "Condition success"
    return "Condition failed"
  }

  create(body): any {
    return this.model.create({conditions: body})
  }

  async checkEligible(id: any): Promise<any> {
    const condition = await this.model.findOne({programName: 'P1', status: true})
    const data: any = await this.dataModel.findById(id)
    // return data
    const tmpData = JSON.parse(JSON.stringify(data))
    return this.isEligible(tmpData.formData['data'], {
      conditions: condition.conditions
    })
  }

  isEligible( data, conditions ) {
    return this.ruleGenerator.execute(conditions, data)
  }

  async getQuestionsByType(formData, componentType) {
    this.questions = []
    this.recursiveComponents(formData.components)
    return this.questions
  }


  questions = []
  notSupportedQuestionTypes = [
    'checkbox',
    'htmlelement',
    'password'
  ]
  recursiveComponents(components) {
    for (const key in components) {
      if ('components' in components[key]) {
        this.recursiveComponents(components[key]['components'])
      } else if ('columns' in components[key]) {
        this.recursiveComponents(components[key]['columns'])
      } else if (!('components' in components[key]) && !('columns' in components[key])) {
        const { label, key: keytype , type, properties, values } = components[key]
        if (this.notSupportedQuestionTypes.indexOf(type) == -1 && properties?.eligibilityQuestion) {
          this.questions.push({label, key: keytype, type, value: values})
        }
      }
    }
  }
}
