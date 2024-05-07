import { Injectable } from '@nestjs/common';
import { CreateRuleEngineDto } from './dto/create-rule-engine.dto';
import { UpdateRuleEngineDto } from './dto/update-rule-engine.dto';
import { InjectModel } from '@nestjs/mongoose';
import { RuleEngine } from '../schemas/rule-engine.schema';
import { Model } from 'mongoose';

@Injectable()
export class RuleEngineService {
  constructor(@InjectModel(RuleEngine.name) private readonly ruleEngineModel: Model<RuleEngine>) {}
  create(createRuleEngineDto: CreateRuleEngineDto) {
    return this.ruleEngineModel.create(createRuleEngineDto)
  }

  findAll() {
    return this.ruleEngineModel.find()
  }

  findOne(id: string) {
    return this.ruleEngineModel.findById(id)
  }

  update(id: string, updateRuleEngineDto: UpdateRuleEngineDto) {
    return this.ruleEngineModel.findByIdAndUpdate(id, updateRuleEngineDto)
  }

  remove(id: string) {
    return this.ruleEngineModel.findByIdAndDelete(id)
  }
}
