import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Schema as MongoSchema } from 'mongoose'

export type ProgramConditionDocument = HydratedDocument<ProgramCondition>

@Schema({ collection: 'program_conditions' })
export class ProgramCondition {
  @Prop({ required: true, default: [] })
  conditions: []

  @Prop({required: true, default: 'P1'})
  programName: string

  @Prop({default: null})
  programId: string

  @Prop({default: null})
  subProgram: string

  status: boolean
}

export const ProgramConditionSchema = SchemaFactory.createForClass(ProgramCondition)
