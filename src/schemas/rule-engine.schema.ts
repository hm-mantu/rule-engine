import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Schema as MongoSchema } from 'mongoose'

export type RuleEngineDocument = HydratedDocument<RuleEngine>

@Schema({ collection: 'rule_engines' })
export class RuleEngine {
    @Prop({ required: true })
    name: string

    @Prop({ required: true, type: MongoSchema.Types.Mixed})
    rule: []
}

export const RuleEngineSchema = SchemaFactory.createForClass(RuleEngine)
